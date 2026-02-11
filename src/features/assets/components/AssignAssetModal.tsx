import { useState } from "react";
import { assetApi } from "../api";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { useBranches } from "../../branches/hooks/useBranches";

interface Props {
  assetId: string;
  onClose: () => void;
  onAssigned: () => void;
}

export const AssignAssetModal = ({ assetId, onClose, onAssigned }: Props) => {
  const { branches, loading } = useBranches();
  const [branchId, setBranchId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAssign = async () => {
    if (!branchId) return;

    try {
      setSubmitting(true);
      await assetApi.assign(assetId, branchId);
      onAssigned();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Assign Asset to Branch</h3>

        {loading ? (
          <p>Loading branches...</p>
        ) : (
          <select
            value={branchId}
            onChange={e => setBranchId(e.target.value)}
            className="input w-full"
          >
            <option value="">Select branch</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>
                {branch.name} ({branch.code})
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-end gap-2">
          <ActionButton
            label="Cancel"
            variant="secondary"
            onClick={onClose}
          />
          <ActionButton
            label="Assign"
            onClick={handleAssign}
            disabled={!branchId || submitting || loading}
          />
        </div>
      </div>
    </div>
  );
};
