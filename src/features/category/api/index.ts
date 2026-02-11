
import { http } from "../../../shared/api/http";
import type { CategoryRequest, CategoryResponse } from "../../../shared/types/category";

export const categoryApi = {
  getAll: async (): Promise<CategoryResponse[]> => {
    const res = await http.get("/api/categories");
    return res.data;
  },

  getById: async (id: string): Promise<CategoryResponse> => {
    const res = await http.get(`/api/categories/${id}`);
    return res.data;
  },

  create: async (data: CategoryRequest): Promise<CategoryResponse> => {
    const res = await http.post("/api/categories", data);
    return res.data;
  },

  update: async (id: string, data: CategoryRequest): Promise<CategoryResponse> => {
    const res = await http.put(`/api/categories/${id}`, data);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await http.delete(`/api/categories/${id}`);
  },
};
