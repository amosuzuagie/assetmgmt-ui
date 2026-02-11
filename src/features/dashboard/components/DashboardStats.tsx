import type { DashboardSummary } from "../../../shared/types/DashboardSummary";

export const DashboardStats = ({ summary }: { summary: DashboardSummary }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
                label="Total Assets"
                value={summary.totalAssets}
            />
            <StatCard 
                label="Total Assets Value"
                value={`# ${summary.totalAssetValue.toLocaleString()}`}
            />
        </div>
    );
}

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
    </div>
)