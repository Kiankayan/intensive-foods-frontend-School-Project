import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCategories, getFood, saveFood } from "@services";
import type { Category, Food } from "@types";

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
});

type FormData = z.infer<typeof schema>;

export default function FoodForm(): React.ReactElement {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);

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
    async function fetch() {
      const { data: categories } = await getCategories();
      setCategories(categories);

      if (!id || id === "new") return;

      const { data: food } = await getFood(id);

      if (!food) return navigate("/not-found");

      reset(mapToFormData(food));
    }

    fetch();
  }, []);

  function mapToFormData(food: Food) {
    return {
      id: food.id,
      name: food.name,
      categoryId: food.category.id,
      numberInStock: food.numberInStock,
      price: food.price,
    };
  }

  async function onSubmit(data: FormData) {
    console.log("data,", data);
    await saveFood(data);
    navigate("/foods");
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Food Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Name</label>

          <input {...register("name")} className="form-control" />

          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

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

        <div className="mb-3">
          <label className="form-label">Number In Stock</label>

          <input
            type="number"
            {...register("numberInStock", {
              valueAsNumber: true,
            })}
            className="form-control"
          />

          {errors.numberInStock && (
            <p className="text-danger">{errors.numberInStock.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Price</label>

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="form-control"
          />

          {errors.price && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </div>

        <button disabled={!isValid} type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
