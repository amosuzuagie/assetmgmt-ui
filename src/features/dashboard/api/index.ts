import { http } from "../../../shared/api/http";
import type { DashboardSummary } from "../../../shared/types/DashboardSummary";


export const dashboardApi = {
  getSummary: () =>
    http
      .get<DashboardSummary>("/api/dashboard/summary")
      .then(r => r.data),
};
