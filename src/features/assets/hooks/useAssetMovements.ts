import { useEffect, useState } from "react"
import { type AssetMovementResponse } from "../../../shared/types/asset"
import { assetMovementApi } from "../api";

export const useAssetMovements = (assetId: string) => {
    const [movements, setMovements] = useState<AssetMovementResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!assetId) return;

        assetMovementApi.getByAsset(assetId)
        .then(setMovements)
        .finally(() => setLoading(false));
    }, [assetId]);

    return { movements, loading };
}