import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// Получение всех проектов
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.github_url,
        p.youtube_url,
        p.readme_url,
        p.website_url,
        p.created_at,
        p.updated_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pi.id,
              'url', pi.image_url,
              'order', pi.order_index
            ) ORDER BY pi.order_index
          ) FILTER (WHERE pi.id IS NOT NULL),
          '[]'
        ) as images
      FROM projects p
      LEFT JOIN project_images pi ON p.id = pi.project_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error?.message || String(error) },
      { status: 500 }
    );
  }
}

// Создание нового проекта
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, githubUrl, youtubeUrl, readmeUrl, websiteUrl, images } = body;

    // Валидация
    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Создаем проект
    const projectResult = await pool.query(
      `INSERT INTO projects (name, github_url, youtube_url, readme_url, website_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, githubUrl || null, youtubeUrl || null, readmeUrl || null, websiteUrl || null]
    );

    const project = projectResult.rows[0];

    // Добавляем изображения
    if (images && images.length > 0) {
      const imageQueries = images.map((url: string, index: number) =>
        pool.query(
          `INSERT INTO project_images (project_id, image_url, order_index)
           VALUES ($1, $2, $3)`,
          [project.id, url, index]
        )
      );
      await Promise.all(imageQueries);
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
