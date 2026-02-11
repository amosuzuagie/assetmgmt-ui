import { useNavigate } from "react-router-dom";
import { categoryApi } from "../api";
import { CategoryForm } from "../components/CategoryForm";

export const CategoryCreatePage = () => {
  const navigate = useNavigate();

  return (
    <CategoryForm
      onSubmit={async data => {
        await categoryApi.create(data);
        navigate("/categories");
      }}
    />
  );
};
