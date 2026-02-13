import { http } from "../../shared/api/http";
import type { AssetCreateRequest, AssetDisposalRequest, AssetMovementRequest, AssetMovementResponse, AssetResponse, AssetSearchRequest } from "../../shared/types/asset";
import type { Page } from "../../shared/types/page";

interface PaginationOptions {
  page?: number;
  size?: number;
  signal?: AbortSignal;
}

export const assetApi = {
  getAll: ({ page = 0, size = 20, signal }: PaginationOptions = {}) =>
    http.get<Page<AssetResponse>>(
      `/api/assets?page=${page}&size=${size}`,
      { signal }
    )
      .then(r => r.data),

  getById: (id: string) =>
    http.get<AssetResponse>(`/api/assets/${id}`)
      .then(r => r.data),

  create: (categoryId: string, data: AssetCreateRequest) =>
    http.post<AssetResponse>(
      `/api/assets/${categoryId}`,
      data
    ).then(r => r.data),

  update: (assetId: string, categoryId: string, data: any) =>
    http.put<AssetResponse>(
      `/api/assets/${assetId}/category/${categoryId}`,
      data
    ).then(r => r.data),

  remove: (id: string) =>
    http.delete(`/api/assets/${id}`),

  restore: (id: string) =>
    http.put(`/api/assets/${id}/restore`),

  // assign: (assetId: string, branchId: string) =>
  //   http.put<AssetResponse>(
  //     `/api/assets/${assetId}/assign/${branchId}`
  //   ).then(r => r.data),

  assign: (data: AssetMovementRequest) =>
  http.post<AssetResponse>(
    `/api/assets/assign`,
    data
  ).then(r => r.data),

  dispose: (data: AssetDisposalRequest) =>
  http.put("/api/assets/" + data.assetId + "/dispose", data),

  getMovements: (assetId: string | undefined) =>
    http
      .get<AssetMovementResponse[]>(`/api/assets/${assetId}/movements`)
      .then(r => r.data),

  search: (
  filter: AssetSearchRequest,
  { page = 0, size = 20, signal }: PaginationOptions = {}
) =>
  http.post<Page<AssetResponse>>(
    `/api/assets/search?page=${page}&size=${size}`,
    filter,
    { signal }
  ).then(r => r.data),
};

export const assetMovementApi = {
  getByAsset: (assetId: string) =>
    http.get<AssetMovementResponse[]>(
      `/api/assets/${assetId}/movements`
    ).then(res => res.data),

    getMovements: (assetId: string | undefined) =>
    http
      .get<AssetMovementResponse[]>(`/api/assets/${assetId}/movements`)
      .then(r => r.data),
};
