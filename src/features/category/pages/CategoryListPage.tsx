import { useEffect, useState } from "react"
import { type CategoryResponse } from "../../../shared/types/category"
import { useNavigate } from "react-router-dom";
import { categoryApi } from "../api";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import { CategoryTable } from "../components/CategoryTable";

export const CategoryListPage = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        categoryApi.getAll().then(setCategories);
    }, []);

    return (
        <div className="space-y-4">
            <div  className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Asset Categories</h2>
                <ActionButton 
                    label="+ Create Category"
                    onClick={() => navigate("/categories/new")}
                />
            </div>

            <CategoryTable 
                categories={categories}
                onEdit={id => navigate(`/categories/${id}/edit`)}
            />
        </div>
    );
}