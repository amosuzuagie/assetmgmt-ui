import { useEffect, useState } from "react";
import type { AssetResponse, AssetSearchRequest } from "../../../shared/types/asset";
import type { Page } from "../../../shared/types/page";
import { useNavigate } from "react-router-dom";
import { assetApi } from "../api";
import { AssetTable } from "../components/AssetTable";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { AssetSearchPanel } from "../components/AssetSearchPanel";
import { Pagination } from "../../../shared/pagination/Pagination";

export const AssetListPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<AssetSearchRequest>({});
  const [pageData, setPageData] = useState<Page<AssetResponse> | null>(null);

  /**
   * Single source of truth for data loading
   */
  useEffect(() => {
    const hasFilters = Object.keys(filters).length > 0;

    const request = hasFilters
      ? assetApi.search(filters, page)
      : assetApi.getAll(page);

    request.then(setPageData);
  }, [filters, page]);

  /**
   * Search handler
   */
  const handleFilterChange = (newFilters: AssetSearchRequest) => {
    setFilters(newFilters);
    setPage(0); // 🔥 reset pagination on new search
  };

  /**
   * Reset search → load all assets
   */
  const loadAll = () => {
    setFilters({});
    setPage(0);
  };

  /**
   * Delete asset
   */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    await assetApi.remove(id);

    setPageData(prev =>
      prev
        ? {
            ...prev,
            content: prev.content.filter(a => a.id !== id),
          }
        : prev
    );
  };

  if (!pageData) {
    return (
      <div className="p-6 text-gray-600">
        Loading assets...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Assets
        </h2>

        <ActionButton
          label="+ Create Asset"
          variant="primary"
          onClick={() => navigate("/assets/new")}
        />
      </div>

      {/* Search */}
      {pageData.content.length > 0 && (
        <AssetSearchPanel
        onSearch={handleFilterChange}
        onReset={loadAll}
      />
      )}

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <AssetTable
          assets={pageData.content}
          onView={id => navigate(`/assets/${id}`)}
          onEdit={id => navigate(`/assets/${id}/edit`)}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <Pagination
        page={pageData.number}
        totalPages={pageData.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
