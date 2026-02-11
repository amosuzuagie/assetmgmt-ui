import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardSummary } from "../../../shared/types/DashboardSummary";

const COLORS = ["#2563eb", "#16a34a", "#dc2626", "#9333ea"];

export const DashboardCharts = ({ summary }: { summary: DashboardSummary }) => {
    const byStatus = mapToChartData(summary.assetsByStatus);
    const byClass = mapToChartData(summary.assetsByClass);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Asset by Status">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={byStatus} dataKey="value" nameKey="name" outerRadius={90}>
                            {byStatus.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Assets by Class">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={byClass}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
}

const mapToChartData = (map: Record<string, number>) =>
    Object.entries(map).map(([name, value]) => ({ name, value }));

const ChartCard = ({ title, children }: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h3 className="font-semibold">{title}</h3>
        {children}
    </div>
);