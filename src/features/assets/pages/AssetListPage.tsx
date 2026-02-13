import { useEffect, useState } from "react";
import type { AssetResponse, AssetSearchRequest } from "../../../shared/types/asset";
import type { Page } from "../../../shared/types/page";
import { useNavigate } from "react-router-dom";
import { assetApi } from "../api";
import { AssetTable } from "../components/AssetTable";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { AssetSearchPanel } from "../components/AssetSearchPanel";
import { Pagination } from "../../../shared/pagination/Pagination";
import { parseApiError } from "../../../shared/api/apiError";
import axios from "axios";

export const AssetListPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<AssetSearchRequest>({});
  const [pageData, setPageData] = useState<Page<AssetResponse> | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const controller = new AbortController();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const hasFilters = Object.keys(filters).length > 0;

      const result = hasFilters
        ? await assetApi.search(filters, { page, size: 20, signal: controller.signal })
        : await assetApi.getAll({page, size: 20, signal: controller.signal});

      setPageData(result);
    } catch (err) {
      if (axios.isCancel(err)) return;

      setError(parseApiError(err))
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  loadData();

  return () => controller.abort();
}, [filters, page]);


  const handleFilterChange = (newFilters: AssetSearchRequest) => {
    setFilters(newFilters);
    setPage(0);
  };

  const loadAll = () => {
    setFilters({});
    setPage(0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      await assetApi.remove(id);

      setPageData(prev =>
        prev
          ? {
              ...prev,
              content: prev.content.filter(a => a.id !== id),
            }
          : prev
      );
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
        "Failed to delete asset."
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

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

      <AssetSearchPanel
        onSearch={handleFilterChange}
        onReset={loadAll}
      />

      {/* Loading */}
      {loading && (
        <div className="text-gray-600">Loading assets...</div>
      )}

      {/* Empty State */}
      {!loading && !error && pageData && pageData.content.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No assets found.
        </div>
      )}

      {/* Table */}
      {!loading && !error && pageData && pageData.content.length > 0 && (
        <>
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <AssetTable
              assets={pageData.content}
              onView={id => navigate(`/assets/${id}`)}
              onEdit={id => navigate(`/assets/${id}/edit`)}
              onDelete={handleDelete}
            />
          </div>

          <Pagination
            page={pageData.number}
            totalPages={pageData.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
