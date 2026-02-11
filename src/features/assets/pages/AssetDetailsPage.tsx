import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { type AssetMovementResponse, type AssetResponse } from "../../../shared/types/asset";
import { assetApi } from "../api";
import { AssetDetailsCard } from "../components/AssetDetailsCard";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { AssignAssetModal } from "../components/AssignAssetModal";
import { DisposeAssetModal } from "../components/DisposeAssetModal";
import { AssetMovementTable } from "../components/AssetMovementTable";
import { useHasRole } from "../../../shared/hooks/useHasRole";

export const AssetDetailsPage = () => {
    const { id } = useParams<{ id: string }> ();
    const navigate = useNavigate();

    const [asset, setAsset] = useState<AssetResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showDispose, setShowDispose] = useState(false);
    const [movements, setMovements] = useState<AssetMovementResponse[]>([]);
    const [loadingMovements, setLoadingMovements] = useState(true);
    

    useEffect(() => {
        if (!id) return;

        assetApi.getById(id)
            .then(setAsset)
            .finally(() => setLoading(false))
    }, [id]);

    useEffect(() => {
      assetApi
        .getMovements(id)
        .then(setMovements)
        .finally(() => setLoadingMovements(false));
    }, [id]);

    if (loading) return <p>Loading asset...</p>
    if (!asset) return <p>Asset not found</p>;

    const canEdit = useHasRole(["ADMIN", "FINANCE"]);
    const canAssign = useHasRole(["ADMIN", "FINANCE"]);
    const canDispose = useHasRole(["ADMIN", "FINANCE"]);

    return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AssetDetailsCard asset={asset} />

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Asset History</h3>

        {loadingMovements ? (
          <p className="text-sm text-gray-500">Loading history...</p>
        ) : (
          <AssetMovementTable movements={movements} />
        )}
      </div>

      {asset.status === "DISPOSED" && (
        <p className="text-sm text-red-600">
          This asset has been disposed and cannot be reassigned.
        </p>
      )}
      
      <div className="flex gap-3">
        {canEdit && (
            <ActionButton
            label="Edit Asset"
            variant="secondary"
            disabled={asset.status === "DISPOSED"}
            onClick={() => navigate(`/assets/${asset.id}/edit`)}
            />
        )}

        {canAssign && (
            <ActionButton
            label="Assign Asset"
            variant="primary"
            disabled={asset.status === "DISPOSED"}
            onClick={() => setShowAssignModal(true)}
            />
        )}

        {canDispose && (
          <ActionButton
            label="Dispose Asset"
            variant="danger"
            onClick={() => setShowDispose(true)}
            disabled={asset.status === "DISPOSED"}
          />
        )}
      </div>
      {showAssignModal && (
        <AssignAssetModal
          assetId={asset.id}
          onClose={() => setShowAssignModal(false)}
          onAssigned={() => {
            assetApi.getById(asset.id).then(setAsset);
          }}
        />
      )}

      {showDispose && (
        <DisposeAssetModal
          assetId={asset.id}
          onClose={() => setShowDispose(false)}
          onDisposed={() =>
            assetApi.getById(asset.id).then(setAsset)
          }
        />
      )}
      
    </div>
  );
}