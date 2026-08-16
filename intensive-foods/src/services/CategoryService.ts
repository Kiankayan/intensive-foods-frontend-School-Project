import type { Category } from "@types";
import axios from "axios";

export async function getCategories() {
  return axios.get<Category[]>("http://localhost:5432/api/categories");
}
