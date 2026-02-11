import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssetForm } from "../components/AssetForm";
import { assetApi } from "../api";
import type { AssetCreateRequest } from "../../../shared/types/asset";

export const CreateAssetPage = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (data: AssetCreateRequest) => {
    try {
      setSubmitting(true);

      // backend expects categoryId in path
      await assetApi.create(data.categoryId, data);

      navigate("/assets");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        Create Asset
      </h2>

      <AssetForm
        onSubmit={handleCreate}
        submitting={submitting}
      />
    </div>
  );
};
