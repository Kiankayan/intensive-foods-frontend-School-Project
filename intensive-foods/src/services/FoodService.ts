import type { Category } from "@types";

export interface Food {
  id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;
  isFavorite: boolean;
}

interface FoodFormData {
  id?: string;
  name: string;
  categoryId: string;
  numberInStock: number;
  price: number;
}

const apiUrl = "https://server.intensivecode.se/api/foods";

const username = "kian";
const accessCode = "hNoRzW";

export async function getFoods(): Promise<Food[]> {
  const response = await fetch(
    `${apiUrl}?username=${username}&accessCode=${accessCode}`,
  );

  console.log("status", response.status);

  const data = await response.json();

  console.log("foods response", data);

  if (!response.ok) {
    throw new Error("Failed to fetch foods");
  }

  return data;
}

export async function getFood(id: string): Promise<Food> {
  const response = await fetch(
    `${apiUrl}/${id}?username=${username}&accessCode=${accessCode}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch food");
  }

  return await response.json();
}

export async function saveFood(food: FoodFormData) {
  const url = food.id
    ? `${apiUrl}/${food.id}?username=${username}&accessCode=${accessCode}`
    : `${apiUrl}?username=${username}&accessCode=${accessCode}`;

  const response = await fetch(url, {
    method: food.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });

  if (!response.ok) {
    throw new Error("Failed to save food");
  }

  return await response.json();
}

export async function deleteFood(id: string) {
  const response = await fetch(
    `${apiUrl}/${id}?username=${username}&accessCode=${accessCode}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete food");
  }
}
