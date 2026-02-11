import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../app/authContext';
import type { DashboardSummary } from '../shared/types/DashboardSummary';
import { http } from '../shared/api/http';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () =>
      http.get<DashboardSummary>('/api/dashboard').then(res => res.data),
  });

  if (isLoading) {
    return <div className="p-6">Loading dashboard…</div>;
  }

  if (!data) return null;

  return (
    <div className="p-6 space-y-6">
      <Header user={user} logout={logout} />
      <Overview summary={data} />
      <Breakdown title="Assets by Status" data={data.assetsByStatus} />
      <Breakdown title="Assets by Class" data={data.assetsByClass} />
      <Breakdown title="Assets by Branch" data={data.assetsByBranch} />
    </div>
  );
}

const Overview = ({ summary }: { summary: DashboardSummary }) => (
  <div className="grid grid-cols-2 gap-4">
    <Card title="Total Assets" value={summary.totalAssets} />
    <Card
      title="Total Asset Value"
      value={`₦${summary.totalAssetValue.toLocaleString()}`}
    />
  </div>
);

const Breakdown = ({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) => (
  <div className="bg-white rounded shadow p-4">
    <h2 className="font-semibold mb-3">{title}</h2>
    <ul className="space-y-2">
      {Object.entries(data).map(([key, value]) => (
        <li key={key} className="flex justify-between">
          <span>{key}</span>
          <span className="font-medium">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Header = ({
  user,
  logout,
}: {
  user: any;
  logout: () => void;
}) => (
  <header className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">
      Dashboard ({user?.role})
    </h1>
    <button onClick={logout} className="text-red-600 underline">
      Logout
    </button>
  </header>
);

const Card = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-sm text-gray-500">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

