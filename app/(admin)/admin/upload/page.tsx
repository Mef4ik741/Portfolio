"use client";

import { useState } from "react";
import { useProjectsStore } from "@/store/projectsStore";

export default function UploadPage() {
  // Form state
  const [name, setName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [readme, setReadme] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const uploadFile = useProjectsStore((s) => s.uploadFile);
  const createProject = useProjectsStore((s) => s.createProject);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3);
      setImages(files);
    }
  };

  const handleReadmeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReadme(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);

    try {
      const imageUrls: string[] = [];
      for (const image of images) {
        imageUrls.push(await uploadFile(image, "image"));
      }

      let readmeUrl: string | null = null;
      if (readme) {
        readmeUrl = await uploadFile(readme, "readme");
      }

      await createProject({
        name,
        githubUrl: githubUrl || null,
        websiteUrl: websiteUrl || null,
        youtubeUrl: youtubeUrl || null,
        readmeUrl,
        images: imageUrls,
      });

      // Reset form
      setName("");
      setGithubUrl("");
      setWebsiteUrl("");
      setYoutubeUrl("");
      setImages([]);
      setReadme(null);
      setSuccess(true);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Ошибка при сохранении проекта");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold text-black">Загрузить проект</h1>

      {success && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-800">
          Проект успешно добавлен!
        </div>
      )}

      <div className="rounded-lg bg-white p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Название проекта *
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
              YouTube URL (инструктаж)
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
              Фотографии (до 3 шт.)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full text-black"
            />
            {images.length > 0 && (
              <p className="mt-1 text-sm text-gray-800">
                Выбрано: {images.length} фото
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              README.md файл
            </label>
            <input
              type="file"
              accept=".md,.markdown,.txt"
              onChange={handleReadmeChange}
              className="w-full text-black"
            />
            {readme && (
              <p className="mt-1 text-sm text-gray-800">
                Выбран: {readme.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {uploading ? "Загрузка..." : "Добавить проект"}
          </button>
        </form>
      </div>
    </div>
  );
}
