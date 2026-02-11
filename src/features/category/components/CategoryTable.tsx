import { ActionButton } from "../../../shared/components/buttons/ActionButton";
import type { CategoryResponse } from "../../../shared/types/category";

type Props = {
  categories: CategoryResponse[];
  onEdit: (id: string) => void;
};

export const CategoryTable = ({ categories, onEdit }: Props) => {
    return (
        <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Asset Class</th>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {categories.map(cat => (
                    <tr key={cat.id} className="border-t">
                        <td className="p-2">{cat.name}</td>
                        <td className="p-2">{cat.assetClass}</td>
                        <td className="p-2">{cat.description ?? "-"}</td>
                        <td className="p-2 text-center">
                            <ActionButton 
                                label="Edit"
                                variant="secondary"
                                onClick={() => onEdit(cat.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}