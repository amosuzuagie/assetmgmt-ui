export type AssetClass = "FF" | "EQ" | "IT" | "VEHICLE";

export type AssetStatus = 'IN_STORE' | 'ASSIGNED' | 'DISPOSED';

export type AssetResponse = {
  id: string;
  assetCode: string;
  description: string;
  assetClass: AssetClass;

  categoryId: string;
  categoryName: string;

  status: AssetStatus;

  branchId?: string;
  branchName?: string;
  
  amount?: number;
  dateOfAcquisition?: string;

  costOfDisposal?: string;
  disposalRemark?: string;
};

export type AssetCreateRequest = {
  assetCode: string;
  description: string;
  categoryId: string;
  serialNumber?: string;
  dateOfAcquisition?: string;
  amount?: number;
  subsidiary?: string;
  remark?: string;
  branchId?: string;
};

export type AssetDisposalRequest = {
  assetId: string;
  costOfDisposal?: number;
  remark?: string;
};

export type AssetMovementResponse = {
  id: string;
  assetId: string;

  fromBranchId?: string;
  fromBranchName?: string;

  toBranchId?: string;
  toBranchName?: string;

  reason?: string;
  movementDate: string; // Instant → ISO string
};

export type AssetSearchRequest = {
  assetCode?: string;
  description?: string;

  assetClass?: AssetClass;
  categoryId?: string;
  branchId?: string;

  status?: AssetStatus;
  subsidiary?: string;

  acquiredFrom?: string; // ISO date string
  acquiredTo?: string;
};

export interface AssetMovementRequest {
  assetId: string;
  toBranchId: string;
  reason: string;
}

export const ASSET_CLASSES: AssetClass[] = [
  "FF",
  "EQ",
  "IT",
  "VEHICLE",
];

export const ASSET_STATUSES: AssetStatus[] = [
  "IN_STORE",
  "ASSIGNED",
  "DISPOSED",
];