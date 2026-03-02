import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

const pool = getPool();

// Cache individual projects for 5 minutes with stale-while-revalidate
export const revalidate = 300;

// Получение одного проекта
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await pool.query(
      `SELECT 
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
      WHERE p.id = $1
      GROUP BY p.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// Обновление проекта
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, githubUrl, youtubeUrl, readmeUrl, websiteUrl, images } = body;

    // Обновляем проект
    const result = await pool.query(
      `UPDATE projects 
       SET name = $1, github_url = $2, youtube_url = $3, readme_url = $4, website_url = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, githubUrl || null, youtubeUrl || null, readmeUrl || null, websiteUrl || null, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Удаляем старые изображения и добавляем новые
    if (images) {
      await pool.query("DELETE FROM project_images WHERE project_id = $1", [id]);

      if (images.length > 0) {
        const imageQueries = images.map((url: string, index: number) =>
          pool.query(
            `INSERT INTO project_images (project_id, image_url, order_index)
             VALUES ($1, $2, $3)`,
            [id, url, index]
          )
        );
        await Promise.all(imageQueries);
      }
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// Удаление проекта
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
