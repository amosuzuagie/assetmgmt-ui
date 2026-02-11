import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { type CategoryRequest } from "../../../shared/types/category";
import { categoryApi } from "../api";
import { CategoryForm } from "../components/CategoryForm";

export const CategoryEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState<CategoryRequest>();

    useEffect(() => {
        if (id) categoryApi.getById(id).then(setCategory);
    }, [id]);

    if(!category) return <p>Loading...</p>

    return (
        <CategoryForm 
            defaultValues={category}
            onSubmit={async data => {
                if (!id) return;
                await categoryApi.update(id, data);
                navigate("/categories");
            }}
        />
    );
}