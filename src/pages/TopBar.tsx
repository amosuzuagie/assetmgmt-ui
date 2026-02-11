import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const param = new URLSearchParams({
      assetCode: query,
      description: query,
    });

    navigate(`/assets?${param.toString}`);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length >= 2) {
        navigate(`/assets?search=${encodeURIComponent(query)}`);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query, navigate]);

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b flex items-center px-6">
      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search by asset code or description..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </header>
  );
};
