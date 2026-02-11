import type { AssetClass } from "./asset";

export interface CategoryRequest {
  name: string;
  assetClass: AssetClass;
  description?: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
  assetClass: AssetClass;
  description?: string;
}

export type { AssetClass };