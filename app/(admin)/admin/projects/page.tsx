"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  github_url: string | null;
  website_url: string | null;
  youtube_url: string | null;
  readme_url: string | null;
  created_at: string;
  images: { id: number; url: string; order: number }[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const fetchedRef = useRef(false);

  // Form state for editing
  const [name, setName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [readme, setReadme] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("API returned error:", data);
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchProjects();
  }, [fetchProjects]);

  const uploadFile = async (file: File, type: "image" | "readme") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setName(project.name);
    setGithubUrl(project.github_url || "");
    setWebsiteUrl(project.website_url || "");
    setYoutubeUrl(project.youtube_url || "");
    setImages([]);
    setReadme(null);
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;
    setUploading(true);

    try {
      // Upload new images if any
      let imageUrls = currentProject.images.map((img) => img.url);
      if (images.length > 0) {
        imageUrls = [];
        for (const image of images) {
          const url = await uploadFile(image, "image");
          imageUrls.push(url);
        }
      }

      // Upload new readme if any
      let readmeUrl = currentProject.readme_url;
      if (readme) {
        readmeUrl = await uploadFile(readme, "readme");
      }

      const projectData = {
        name,
        githubUrl: githubUrl || null,
        websiteUrl: websiteUrl || null,
        youtubeUrl: youtubeUrl || null,
        readmeUrl,
        images: imageUrls,
      };

      const res = await fetch(`/api/projects/${currentProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed to update project");

      setIsEditing(false);
      setCurrentProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Ошибка при обновлении проекта");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить проект?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Ошибка при удалении");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentProject(null);
    setName("");
    setGithubUrl("");
    setWebsiteUrl("");
    setYoutubeUrl("");
    setImages([]);
    setReadme(null);
  };

  if (loading) {
    return <div className="p-8">Загрузка...</div>;
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-black">Список проектов</h1>

      {isEditing && currentProject && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-black">
            Редактировать проект
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Название проекта
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded border border-gray-300 p-2 text-black"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-black"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Website URL (домен проекта)
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-black"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                YouTube URL
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-black"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Новые фотографии (заменит существующие)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setImages(Array.from(e.target.files).slice(0, 3));
                  }
                }}
                className="w-full text-black"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Новый README.md
              </label>
              <input
                type="file"
                accept=".md,.markdown,.txt"
                onChange={(e) => {
                  if (e.target.files?.[0]) setReadme(e.target.files[0]);
                }}
                className="w-full text-black"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={uploading}
                className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
              >
                {uploading ? "Сохранение..." : "Сохранить"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded border border-gray-300 px-4 py-2 text-gray-700"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow">
        {projects.length === 0 ? (
          <p className="text-gray-600">Нет проектов</p>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-start justify-between border-b border-gray-200 pb-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{project.name}</h3>
                  <div className="mt-2 flex gap-2">
                    {project.images.slice(0, 3).map((img) => (
                      <div
                        key={img.id}
                        className="relative h-16 w-16 overflow-hidden rounded"
                      >
                        <Image
                          src={img.url}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-4 text-sm text-gray-600">
                    {project.website_url && (
                      <a
                        href={project.website_url}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {project.youtube_url && (
                      <a
                        href={project.youtube_url}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        YouTube
                      </a>
                    )}
                    {project.readme_url && (
                      <a
                        href={project.readme_url}
                        target="_blank"
                        rel="noopener"
                        className="text-blue-600 hover:underline"
                      >
                        README
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
