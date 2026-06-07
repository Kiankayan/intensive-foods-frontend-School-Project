import type { Category } from "@types";
import { getCategories } from "@services/fakeCategoryService";

export interface Food {
  id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;
  isFavorite: boolean;
}

interface FoodFormData {
  _id?: string;
  name: string;
  categoryId: string;
  numberInStock: number;
  price: number;
}

const foods: Food[] = [
  {
    id: "5b21ca3eeb7f6fbccd471815",
    name: "Apple",
    category: { id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 6,
    price: 10,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd471816",
    name: "Banana",
    category: { id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 5,
    price: 15,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd471817",
    name: "Cucumber",
    category: { id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 8,
    price: 7,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd471819",
    name: "Chips",
    category: { id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 12,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181a",
    name: "Cookies",
    category: { id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 8,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181b",
    name: "Muffins",
    category: { id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
    numberInStock: 7,
    price: 13,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181e",
    name: "Carrot",
    category: { id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 7,
    price: 7,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd47181f",
    name: "Sallad",
    category: { id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
    numberInStock: 4,
    price: 14,
    isFavorite: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd471821",
    name: "Orange",
    category: { id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
    numberInStock: 7,
    price: 20,
    isFavorite: false,
  },
];

export function getFoods() {
  return foods;
}

export function getFood(id: string) {
  return foods.find((food) => food._id === id);
}

export function saveFood(food: FoodFormData) {
  const categoryInDb = getCategories().find(
    (category) => category._id === food.categoryId,
  );

  if (!categoryInDb) throw new Error(`Category was not found`);

  const foodInDb = foods.find((f) => f._id === food._id) || ({} as Food);

  foodInDb.name = food.name;
  foodInDb.category = categoryInDb;
  foodInDb.numberInStock = food.numberInStock;
  foodInDb.price = food.price;

  if (!foodInDb._id) {
    foodInDb._id = Date.now().toString();
    foodInDb.isFavorite = false;

    foods.push(foodInDb);
  }

  return foodInDb;
}

export function deleteFood(id: string) {
  const foodInDb = foods.find((food) => food._id === id);

  if (foodInDb) foods.splice(foods.indexOf(foodInDb), 1);

  return foodInDb;
}
