import { useEffect, useState } from "react";
import type { CategoryResponse } from "../../../shared/types/category";
import { categoryApi } from "../api";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    categoryApi.getAll()
      .then(data => {
        if (mounted) setCategories(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { categories, loading };
};
