import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AssetForm } from "../components/AssetForm";
import { assetApi } from "../api";
import type { AssetCreateRequest, AssetResponse } from "../../../shared/types/asset";

export const EditAssetPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [asset, setAsset] = useState<AssetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    assetApi.getById(id)
      .then(setAsset)
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data: AssetCreateRequest) => {
    if (!id) return;

    try {
      setSubmitting(true);
      await assetApi.update(id, data.categoryId, data);
      navigate("/assets");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading asset...</div>;
  }

  if (!asset) {
    return <div className="p-6 text-red-600">Asset not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        Edit Asset
      </h2>

      <AssetForm
        onSubmit={handleUpdate}
        submitting={submitting}
        defaultValues={{
          assetCode: asset.assetCode,
          description: asset.description,
          categoryId: asset.categoryId, // must exist in response
          amount: asset.amount,
          dateOfAcquisition: asset.dateOfAcquisition,
          branchId: asset.branchId,
        }}
      />
    </div>
  );
};
