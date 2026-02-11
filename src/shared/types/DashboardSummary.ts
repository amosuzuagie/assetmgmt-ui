export type DashboardSummary = {
    totalAssets: number;
    totalAssetValue: number;

    assetsByStatus: Record<string, number>;
    assetsByClass: Record<string, number>;
    assetsByBranch: Record<string, number>;

    assetValueByClass: Record<string, number>;
    assetValueByBranch: Record<string, number>;
};