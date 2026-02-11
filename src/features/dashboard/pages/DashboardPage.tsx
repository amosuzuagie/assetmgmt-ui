import { useEffect, useState } from "react";
import { type DashboardSummary } from "../../../shared/types/DashboardSummary";
import { dashboardApi } from "../api";
import { DashboardStats } from "../components/DashboardStats";
import { DashboardCharts } from "../components/DashboardCharts";

export default function DashboardPage() {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardApi.getSummary()
        .then(setSummary)
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading dashboard...</p>
    if (!summary) return <p>No dashboard summary data</p>;

    return (
        <div className="space-y-6">
            <DashboardStats summary={summary} />
            <DashboardCharts summary={summary} />
        </div>
    );
}