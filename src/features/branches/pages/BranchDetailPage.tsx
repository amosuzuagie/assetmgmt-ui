import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { branchApi } from "../api";
import type { BranchResponse } from "../../../shared/types/branch";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";

export const BranchDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState<BranchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    branchApi
      .getById(id)
      .then(setBranch)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading branch...</p>;
  }

  if (!branch) {
    return <p className="text-red-500">Branch not found.</p>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{branch.name}</h2>
          <p className="text-sm text-gray-500">
            Code: {branch.code}
          </p>
        </div>

        <ActionButton
          label="Edit Branch"
          variant="secondary"
          onClick={() => navigate(`/branches/${branch.id}/edit`)}
        />
      </div>

      {/* Details Card */}
      <div className="bg-white border rounded-lg p-6 space-y-4">
        <DetailRow label="State" value={branch.state} />
        <DetailRow label="Location" value={branch.location} />
        <DetailRow
          label="Address"
          value={branch.address ?? "—"}
          muted={!branch.address}
        />
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
  muted,
}: {
  label: string;
  value: string | any;
  muted?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-500">{label}</span>
    <span
      className={`text-sm font-medium ${
        muted ? "text-gray-400 italic" : "text-gray-800"
      }`}
    >
      {value}
    </span>
  </div>
);
