export type ProjectImage = {
  id: number;
  url: string;
  order: number;
};

export type Project = {
  id: number;
  name: string;
  github_url: string | null;
  website_url: string | null;
  youtube_url: string | null;
  readme_url: string | null;
  created_at: string;
  images: ProjectImage[];
};

export type CreateProjectPayload = {
  name: string;
  githubUrl: string | null;
  websiteUrl: string | null;
  youtubeUrl: string | null;
  readmeUrl: string | null;
  images: string[];
};

export type UpdateProjectPayload = CreateProjectPayload;

export type UploadType = "image" | "readme";

export type UploadResponse = {
  url: string;
  publicId: string;
};
