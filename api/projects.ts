import { apiRequest } from "./apiClient";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "./types";

export function getProjects() {
  return apiRequest<Project[]>("/api/projects");
}

export function getProject(id: string | number) {
  return apiRequest<Project>(`/api/projects/${id}`);
}

export function createProject(payload: CreateProjectPayload) {
  return apiRequest<Project>("/api/projects", {
    method: "POST",
    body: payload,
  });
}

export function updateProject(id: string | number, payload: UpdateProjectPayload) {
  return apiRequest<Project>(`/api/projects/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteProject(id: string | number) {
  return apiRequest<{ message: string }>(`/api/projects/${id}`, {
    method: "DELETE",
  });
}
