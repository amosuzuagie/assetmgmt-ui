import type { AssetResponse } from "../../../shared/types/asset";
import { AssetStatusBadge } from "./AssetStatusBadge";

export const AssetDetailsCard = ({ asset }: { asset: AssetResponse }) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 gap-4">
      <Detail label="Asset Code" value={asset.assetCode} />
      <Detail label="Description" value={asset.description} />
      <Detail label="Category" value={asset.categoryName} />
      <Detail label="Class" value={asset.assetClass} />
      <Detail label="Status" value={<AssetStatusBadge status={asset.status} />} />
      <Detail label="Branch" value={asset.branchName ?? "-"} />
      <Detail label="Amount" value={asset.amount?.toLocaleString() ?? "-"} />
      <Detail label="Acquired" value={asset.dateOfAcquisition ?? "-"} />
    </div>
    {asset.status === "DISPOSED" && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 space-y-2">
          <h3 className="text-sm font-semibold text-red-700">
            Disposal Information
          </h3>

          <p className="text-sm">
            <span className="font-medium">Cost:</span>{" "}
            {asset.costOfDisposal ?? "—"}
          </p>

          <p className="text-sm">
            <span className="font-medium">Remark:</span>{" "}
            {asset.disposalRemark ?? "—"}
          </p>
        </div>
      )}
    </>
  );
};

const Detail = ({ label, value }: { label: string; value: string | any }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
