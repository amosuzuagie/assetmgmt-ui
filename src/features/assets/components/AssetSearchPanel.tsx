import { useState } from "react";
import { ASSET_CLASSES, ASSET_STATUSES, type AssetClass, type AssetSearchRequest, type AssetStatus } from "../../../shared/types/asset";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { useBranches } from "../../branches/hooks/useBranches";
import { useCategories } from "../../category/hooks/useCategories";

interface Props {
  onSearch: (filter: AssetSearchRequest) => void;
  onReset: () => void;
}

export const AssetSearchPanel = ({ onSearch, onReset }: Props) => {
  const [filter, setFilter] = useState<AssetSearchRequest>({});
  const { branches } = useBranches();
  const { categories } = useCategories();

  const update = <K extends keyof AssetSearchRequest>(
    key: K,
    value: AssetSearchRequest[K]
  ) => {
    setFilter(prev => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          className="input"
          placeholder="Asset Code"
          onChange={e => update("assetCode", e.target.value)}
        />

        <input
          className="input"
          placeholder="Description"
          onChange={e => update("description", e.target.value)}
        />

        {/* <input
          className="input"
          placeholder="Subsidiary"
          onChange={e => update("subsidiary", e.target.value)}
        /> */}

        {/** Subsidiary */}
        <select
            className="input"
            onChange={e => update("subsidiary", e.target.value)}
        >
            <option value="">Select Subsidiary</option>
            <option value="WGC">WGC</option>
            <option value="WGG">WGB</option>
            <option value="OTHERS">Others</option>
        </select>

        {/* Asset Class */}
        <select
          className="input"
          onChange={e => update("assetClass", e.target.value as AssetClass)}
        >
          <option value="">All Asset Classes</option>
          {Object.values(ASSET_CLASSES).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Category */}
        <select
          className="input"
          onChange={e => update("categoryId", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Branch */}
        <select
          className="input"
          onChange={e => update("branchId", e.target.value)}
        >
          <option value="">All Branches</option>
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        {/* Status */}
        <select
          className="input"
          onChange={e => update("status", e.target.value as AssetStatus)}
        >
          <option value="">All Status</option>
          {Object.values(ASSET_STATUSES).map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Date range */}
        <input
          type="date"
          className="input"
          onChange={e => update("acquiredFrom", e.target.value)}
        />

        <input
          type="date"
          className="input"
          onChange={e => update("acquiredTo", e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <ActionButton
          label="Reset"
          variant="secondary"
          onClick={onReset}
        />
        <ActionButton
          label="Search"
          onClick={() => onSearch(filter)}
        />
      </div>
    </div>
  );
};
