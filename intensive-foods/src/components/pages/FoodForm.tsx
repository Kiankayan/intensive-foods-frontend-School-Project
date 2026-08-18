import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveFood } from "@services";
import type { Food } from "@types";
import { _Input, InputField } from "@components/common";
import { useGetFood } from "@queries/foods";
import { useGetCategories } from "@queries/categories";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  categoryId: z.string().min(1, { message: "You must select a category" }),
  numberInStock: z
    .number()
    .min(1, { message: "Stock must be at least 1" })
    .max(100, { message: "Stock cannot exceed 100" }),
  price: z
    .number()
    .min(1, { message: "Price must be at least 1" })
    .max(20, { message: "Price cannot exceed 20" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

type FormData = z.infer<typeof schema>;

export default function FoodForm(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: categories = [] } = useGetCategories();
  const { data: food, isError, isLoading } = useGetFood(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isError) {
      navigate("/not-found");
      return;
    }

    if (food) {
      reset(mapToFormData(food));
    }
  }, [food, isError]);

  function mapToFormData(food: Food): FormData {
    return {
      id: food.id,
      name: food.name,
      categoryId: food.category.id,
      numberInStock: food.numberInStock,
      price: food.price,
      imageUrl: food.imageUrl,
    };
  }

  async function onSubmit(data: FormData) {
    await saveFood(data);
    navigate("/foods");
  }

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Food Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <InputField.Input {...register("name")} />
          <InputField.Label>
            <i className="fa-solid fa-user" /> Name
          </InputField.Label>
          <InputField.Error error={errors.name} />
        </InputField>

        <div className="mb-3">
          <label className="form-label">Category</label>

          <select {...register("categoryId")} className="form-select">
            <option value=""></option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-danger">{errors.categoryId.message}</p>
          )}
        </div>

        <_Input
          {...register("numberInStock", {
            valueAsNumber: true,
          })}
          label="Stock"
          error={errors.numberInStock}
        />

        <_Input
          {...register("price", {
            valueAsNumber: true,
          })}
          label="Price"
          error={errors.price}
        />

        <_Input
          {...register("imageUrl")}
          label="Image"
          error={errors.imageUrl}
        />

        <button disabled={!isValid} type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
