import type { AssetMovementResponse } from "../../../shared/types/asset";

interface Props {
  movements: AssetMovementResponse[];
}

export const AssetMovementTable = ({ movements }: Props) => {
  if (movements.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No movement history available.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">From</th>
            <th className="px-4 py-2">To</th>
            <th className="px-4 py-2">Reason</th>
          </tr>
        </thead>

        <tbody>
          {movements.map(m => (
            <tr key={m.id} className="border-b last:border-0">
              <td className="px-4 py-2 text-gray-600">
                {new Date(m.movementDate).toLocaleString()}
              </td>

              <td className="px-4 py-2">
                {m.fromBranchName ?? (
                  <span className="text-gray-400 italic">N/A</span>
                )}
              </td>

              <td className="px-4 py-2">
                {m.toBranchName ?? (
                  <span className="text-gray-400 italic">N/A</span>
                )}
              </td>

              <td className="px-4 py-2">
                {m.reason || (
                  <span className="text-gray-400 italic">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
