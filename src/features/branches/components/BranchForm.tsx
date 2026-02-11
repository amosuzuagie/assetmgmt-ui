import { useState } from "react";
import type { BranchCreateRequest } from "../../../shared/types/branch";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { NIGERIAN_STATES } from "../../../shared/constants/nigerianStates";


type Props = {
  initialValues?: Partial<BranchCreateRequest>;
  onSubmit: (data: BranchCreateRequest) => void;
  submitting?: boolean;
};

export const BranchForm = ({
  initialValues,
  onSubmit,
  submitting = false,
}: Props) => {
  const [form, setForm] = useState<BranchCreateRequest>({
    name: initialValues?.name ?? "",
        code: initialValues?.code ?? "",
        location: initialValues?.location ?? "",
        state: initialValues?.state ?? "",
        address: initialValues?.address ?? ""
  });

  const update = (field: keyof BranchCreateRequest, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Branch Name"
        value={form.name}
        onChange={e => update("name", e.target.value)}
        required
      />

      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Branch Code"
        value={form.code}
        onChange={e => update("code", e.target.value)}
        required
      />

      <select
        className="w-full border rounded px-3 py-2 bg-white"
        value={form.state}
        onChange={e => update("state", e.target.value)}
        required
      >
        <option value="">Select State</option>
        {NIGERIAN_STATES.map(state => (
            <option value={state} key={state}>{state}</option>
        ))}
      </select>

      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Location (optional)"
        value={form.location ?? ""}
        onChange={e => update("location", e.target.value)}
      />

      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Address"
        value={form.address}
        onChange={e => update("address", e.target.value)}
      />

      <ActionButton
        label={submitting ? "Saving..." : "Save Branch"}
        onClick={() => {}}
        disabled={submitting}
      />
    </form>
  );
};