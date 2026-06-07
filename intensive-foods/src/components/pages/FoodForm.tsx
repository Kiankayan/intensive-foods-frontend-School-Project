import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCategories, getFood, saveFood } from "@services";
import type { Category } from "@types";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),
  numberInStock: z
    .number()
    .min(1, "Stock must be at least 1")
    .max(100, "Stock cannot exceed 100"),
  price: z
    .number()
    .min(1, "Price must be at least 1")
    .max(20, "Price cannot exceed 20"),
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
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadFood() {
      if (id === "new") return;

      try {
        const food = await getFood(id!);

        reset({
          name: food.name,
          categoryId: food.category.id,
          numberInStock: food.numberInStock,
          price: food.price,
        });
      } catch {
        navigate("/foods");
      }
    }

    loadFood();
  }, [id, navigate, reset]);

  async function onSubmit(data: FormData) {
    await saveFood({
      id: id === "new" ? undefined : id,
      ...data,
    });

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
