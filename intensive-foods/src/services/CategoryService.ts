import type { Category } from "@types";

const apiUrl = "https://server.intensivecode.se/api/categories";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
}
