import { useForm } from "react-hook-form";
import type { CategoryRequest, AssetClass } from "../../../shared/types/category";
import { ActionButton } from "../../../shared/components/buttons/ActionButton";

type Props = {
  onSubmit: (data: CategoryRequest) => void;
  defaultValues?: Partial<CategoryRequest>;
};

const ASSET_CLASSES: AssetClass[] = [ "FF", "EQ", "IT", "VEHICLE"]

export const CategoryForm = ({ onSubmit, defaultValues }: Props) => {
  const { register, handleSubmit } = useForm<CategoryRequest>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <input
        {...register("name", { required: true })}
        placeholder="Category Name"
        className="w-full border px-3 py-2 rounded-md"
      />

      <select
        {...register("assetClass", { required: true })}
        className="w-full border px-3 py-2 rounded-md"
      >
        <option value="">Select Asset Class</option>
        {ASSET_CLASSES.map(cls => (
          <option key={cls} value={cls}>
            {cls}
          </option>
        ))}
      </select>

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border px-3 py-2 rounded-md"
      />

      <ActionButton label="Save Category" />
    </form>
  );
};





// import { useForm } from "react-hook-form";
// import type { AssetClass, CategoryRequest } from "../../../shared/types/category";
// import { ActionButton } from "../../../shared/components/buttons/ActionButton";

// type Props = {
//   onSubmit: (data: CategoryRequest) => void;
//   defaultValues?: Partial<CategoryRequest>;
// };

// const ASSET_CLASSES: AssetClass[] = [ "FF", "EQ", "IT", "VEHICLE"]

// export const CategoryForm = ({ onSubmit, defaultValues }: Props) => {
//     const { register, handleSubmit } = useForm<CategoryRequest>({
//         defaultValues,
//     });

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
//             <input 
//                 {...register("name", {required: true})}
//                 placeholder="Category Name"
//                 className="w-full border px-3 py-2 rounded-md"
//             />

//             <select 
//                 {...register("assetClass", {required: true})}
//                 className="w-full border px-3 py-2 rounded-md"
//             >
//                 <option value="">Select Asset Class</option>
//                 {ASSET_CLASSES.map(cls => (
//                     <option key={cls} value={cls}>
//                         {cls}
//                     </option>
//                 ))}
//             </select>

//             <textarea 
//                 {...register("description")}
//                 placeholder="Description"
//                 className="w-full border px-3 py-2"
//             />

//             <ActionButton label="Save Category" />
//         </form>
//     );
// }