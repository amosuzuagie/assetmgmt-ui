import { useEffect, useState } from "react";
import type { BranchResponse } from "../../../shared/types/branch";
import { branchApi } from "../api";

export const useBranches = () => {
  const [branches, setBranches] = useState<BranchResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    branchApi.getAll()
      .then(data => {
        if (mounted) setBranches(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { branches, loading };
};
