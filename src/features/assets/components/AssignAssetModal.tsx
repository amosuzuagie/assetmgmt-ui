import { useState } from "react";
import { assetApi } from "../api";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { useBranches } from "../../branches/hooks/useBranches";
import type { AssetMovementRequest } from "../../../shared/types/asset";
import axios from "axios";

interface Props {
  assetId: string;
  onClose: () => void;
  onAssigned: () => void;
}

export const AssignAssetModal = ({
  assetId,
  onClose,
  onAssigned,
}: Props) => {
  const { branches, loading } = useBranches();
  const [branchId, setBranchId] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAssign = async () => {
    if (!branchId) return;

    const payload: AssetMovementRequest = {
      assetId,
      toBranchId: branchId,
      reason,
    };

    try {
      setSubmitting(true);

      await assetApi.assign(payload);

      onAssigned();
      onClose();
    } catch (err) {
      if (axios.isCancel(err)) return;
      // No toast here — interceptor handles it
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-lg">
        <h3 className="text-lg font-semibold">
          Assign Asset to Branch
        </h3>

        {loading ? (
          <p>Loading branches...</p>
        ) : (
          <>
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="input w-full"
            >
              <option value="">Select branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name} ({branch.code})
                </option>
              ))}
            </select>

            <textarea
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="input w-full"
              rows={3}
            />
          </>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <ActionButton
            label="Cancel"
            variant="secondary"
            onClick={onClose}
          />
          <ActionButton
            label={submitting ? "Assigning..." : "Assign"}
            onClick={handleAssign}
            disabled={!branchId || submitting || loading}
          />
        </div>
      </div>
    </div>
  );
};
