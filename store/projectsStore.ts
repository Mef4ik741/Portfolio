import { create } from "zustand";

import * as projectsApi from "@/api/projects";
import * as uploadApi from "@/api/upload";
import type { CreateProjectPayload, Project, UpdateProjectPayload } from "@/api/types";

type ProjectsState = {
  projects: Project[];
  loading: boolean;
  error: string | null;

  loadProjects: () => Promise<void>;
  createProject: (payload: CreateProjectPayload) => Promise<Project>;
  updateProject: (id: number, payload: UpdateProjectPayload) => Promise<Project>;
  deleteProject: (id: number) => Promise<void>;

  uploadFile: (file: File, type: "image" | "readme") => Promise<string>;
};

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  loadProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await projectsApi.getProjects();
      set({ projects, loading: false, error: null });
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "message" in e
          ? String((e as { message?: unknown }).message)
          : String(e);
      set({ projects: [], loading: false, error: message });
    }
  },

  createProject: async (payload) => {
    set({ error: null });
    const created = await projectsApi.createProject(payload);
    set({ projects: [created, ...get().projects] });
    return created;
  },

  updateProject: async (id, payload) => {
    set({ error: null });
    const updated = await projectsApi.updateProject(id, payload);
    set({ projects: get().projects.map((p) => (p.id === id ? { ...p, ...updated } : p)) });
    return updated;
  },

  deleteProject: async (id) => {
    set({ error: null });
    await projectsApi.deleteProject(id);
    set({ projects: get().projects.filter((p) => p.id !== id) });
  },

  uploadFile: async (file, type) => {
    set({ error: null });
    const { url } = await uploadApi.uploadFile(file, type);
    return url;
  },
}));
