import type { Category } from "@types";

const categories: Category[] = [
  { id: "5b21ca3eeb7f6fbccd471818", name: "Fruit" },
  { id: "5b21ca3eeb7f6fbccd471814", name: "Snacks" },
  { id: "5b21ca3eeb7f6fbccd471820", name: "Vegetables" },
];

export function getCategories() {
  return categories;
}
