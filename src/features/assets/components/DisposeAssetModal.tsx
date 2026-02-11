import { useState } from "react";
import { assetApi } from "../api";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";

interface Props {
  assetId: string;
  onClose: () => void;
  onDisposed: () => void;
}

export const DisposeAssetModal = ({
  assetId,
  onClose,
  onDisposed,
}: Props) => {
  const [costOfDisposal, setCostOfDisposal] = useState("");
  const [remark, setRemark] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDispose = async () => {
    try {
      setSubmitting(true);

      await assetApi.dispose({
        assetId,
        costOfDisposal: costOfDisposal
          ? Number(costOfDisposal)
          : undefined,
        remark: remark || undefined,
      });

      onDisposed();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold text-red-600">
          Dispose Asset
        </h3>

        <input
          type="number"
          placeholder="Cost of disposal (optional)"
          value={costOfDisposal}
          onChange={e => setCostOfDisposal(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />

        <textarea
          placeholder="Remark (optional)"
          value={remark}
          onChange={e => setRemark(e.target.value)}
          className="w-full border rounded-md px-3 py-2"
          rows={3}
        />

        <div className="flex justify-end gap-2">
          <ActionButton
            label="Cancel"
            variant="secondary"
            onClick={onClose}
          />
          <ActionButton
            label="Dispose"
            variant="danger"
            onClick={handleDispose}
            disabled={submitting}
          />
        </div>
      </div>
    </div>
  );
};
