import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BranchForm } from "../components/BranchForm";
import { branchApi } from "../api";
import type { BranchResponse } from "../../../shared/types/branch";

export const EditBranchPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [branch, setBranch] = useState<BranchResponse | null>(null);

  useEffect(() => {
    if (id) branchApi.getById(id).then(setBranch);
  }, [id]);

  if (!branch) return <p>Loading...</p>;

  const handleUpdate = async (data: any) => {
    await branchApi.update(branch.id, data);
    navigate("/branches");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Branch</h2>

      <BranchForm
        initialValues={branch}
        onSubmit={handleUpdate}
      />
    </div>
  );
};
