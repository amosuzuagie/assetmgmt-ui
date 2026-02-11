import { useNavigate } from "react-router-dom"
import { branchApi } from "../api";
import { BranchForm } from "../components/BranchForm";

export const CreateBranchPage = () => {
    const navigate = useNavigate();

    const handleCreate = async (data: any) => {
        await branchApi.create(data);
        navigate("/branches");
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Create Branch</h2>
            <BranchForm onSubmit={handleCreate} />
        </div>
    );
}