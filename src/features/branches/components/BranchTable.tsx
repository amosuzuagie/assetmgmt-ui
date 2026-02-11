import { useNavigate } from "react-router-dom";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import type { BranchResponse } from "../../../shared/types/branch";

type Props = {
  branches: BranchResponse[];
  // onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const BranchTable = ({ branches, onDelete }: Props) => {
  const navigate = useNavigate();

    return (
    <table className="w-full border-collapse bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Code</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Location</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {branches.map(branch => (
          <tr key={branch.id} className="border-t">
            <td className="p-3">{branch.code}</td>
            <td className="p-3">{branch.name}</td>
            <td className="p-3">{branch.location || "---"}</td>
            <td className="p-3">
              <ActionButton
                label="View"
                variant="secondary"
                onClick={() => navigate(`/branches/${branch.id}`)}
              />
              <ActionButton 
                label="Delete"
                variant="danger"
                onClick={() => onDelete(branch.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}