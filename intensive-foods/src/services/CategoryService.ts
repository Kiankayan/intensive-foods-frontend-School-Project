import type { Category } from "@types";
import axios from "axios";

export async function getCategories() {
  return axios.get<Category[]>(
    "https://server.intensivecode.se/api/categories",
  );
}
