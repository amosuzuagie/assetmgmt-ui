import { useForm } from "react-hook-form";
import type { AssetCreateRequest } from "../../../shared/types/asset";
import { useEffect, useMemo, useState } from "react";
import { type CategoryResponse } from "../../../shared/types/category";
import { categoryApi } from "../../category/api";
import type { BranchResponse } from "../../../shared/types/branch";
import { branchApi } from "../../branches/api";

type Props = {
  onSubmit: (data: AssetCreateRequest) => void;
  submitting?: boolean;
  defaultValues?: Partial<AssetCreateRequest>;
};

export const AssetForm = ({ onSubmit, submitting, defaultValues }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AssetCreateRequest>({defaultValues});

  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [branches, setBranches] = useState<BranchResponse[]>([]);

  const assetClass = watch("categoryId");

  useEffect(() => {
    categoryApi.getAll().then(setCategories)
  }, []);

  useEffect(() => {
    branchApi.getAll().then(setBranches);
  }, []);

  const filteredCategories = useMemo(() => categories, [categories]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm border"
    >
      <h3 className="text-lg font-semibold text-gray-800">
        Asset Details
      </h3>

      {/* Asset Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Asset Code
        </label>
        <input
          {...register("assetCode", { required: true })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
        {errors.assetCode && (
          <p className="text-xs text-red-600 mt-1">
            Asset code is required
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          {...register("description", { required: true })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Category */}
      <select 
        {...register("categoryId", {required: true})}
        className="input"
        defaultValue=""
      >
        <option value="" disabled>Select Category</option>
        {filteredCategories.map(cat =>(
          <option key={cat.id} value={cat.id}>
            {cat.name} ({cat.assetClass})
          </option>
        ))}
      </select>

      {/* Serial Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Serial Number
        </label>
        <input
          {...register("serialNumber")}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Subsidiary */}
      <select 
        {...register("subsidiary")}
        className="input"
        defaultValue=""
      >
        <option value="">Select Subsidiary</option>
        <option value="WGC">WGC</option>
        <option value="WGG">WGB</option>
        <option value="OTHERS">Others</option>
      </select>

      {/* Branch */}
      <select
        {...register("branchId")}
        className="input"
        defaultValue=""
      >
        <option value="">
          Assign to Branch (optional)
        </option>
        {branches.map(branch => (
          <option key={branch.id} value={branch.id}>
            {branch.name} ({branch.code})
          </option>
        ))}
      </select>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date of Acquisition
        </label>
        <input
          type="date"
          {...register("dateOfAcquisition")}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Remark */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Remark
        </label>
        <textarea
          {...register("remark")}
          className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="
            inline-flex items-center gap-2
            rounded-md bg-blue-600 px-4 py-2
            text-sm font-medium text-white
            hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50
          "
        >
          Save Asset
        </button>
      </div>
    </form>
  );
};
