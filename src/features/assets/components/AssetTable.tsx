import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import type { AssetResponse } from "../../../shared/types/asset";
import { AssetStatusBadge } from "./AssetStatusBadge";

type Props = {
  assets: AssetResponse[];
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
};

export const AssetTable = ({ assets, onEdit, onView, onDelete }: Props) => {
  return (
    <table className="w-full border-collapse text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Code</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Class</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
          <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {assets.map(asset => (
          <tr
            key={asset.id}
            className="hover:bg-gray-50 transition"
          >
            <td className="px-4 py-3 font-mono text-gray-800">
              {asset.assetCode}
            </td>
            <td className="px-4 py-3 text-gray-700">
              {asset.assetClass}
            </td>
            <td className="px-4 py-3">
              <span
                className="
                  inline-flex rounded-full px-2 py-0.5 text-xs font-medium
                  bg-gray-100 text-gray-700
                "
              >
                {<AssetStatusBadge status={asset.status} />}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-700">
              {asset.amount ?? "-"}
            </td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <ActionButton 
                  label="View"
                  variant="primary"
                  onClick={() => onView(asset.id)}
                />

                <ActionButton 
                  label="Edit"
                  variant="warning"
                  onClick={() => onEdit(asset.id)}
                  disabled={asset.status === "DISPOSED"}
                />
                
                <ActionButton 
                  label="Delete"
                  variant="danger"
                  onClick={() => onDelete(asset.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
