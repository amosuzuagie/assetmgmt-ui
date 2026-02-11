import { http } from "../../../shared/api/http";
import type { BranchCreateRequest, BranchResponse } from "../../../shared/types/branch";

export const branchApi = {
    getAll: () =>
      http.get<BranchResponse[]>("/api/branches")
        .then(r => r.data),

    getById: (id: string) =>
      http.get<BranchResponse>(`/api/branches/${id}`)
        .then(r => r.data),

    create: (data: BranchCreateRequest) =>
      http.post<BranchResponse>("/api/branches", data)
        .then(r => r.data),

    update: (id: string, data: BranchCreateRequest) =>
      http.put<BranchResponse>(`/api/branches/${id}`, data)
        .then(r => r.data),

    delete: (id: string) =>
      http.delete(`/api/branches/${id}`),
};
