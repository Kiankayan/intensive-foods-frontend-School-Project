import { useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { paginate } from "@/utils";
import { FoodsTable } from "@components";
import type { Category, SortColumn } from "@/types";
import { ListGroup, Pagination, SearchBox } from "@/components/common";
import { auth } from "@services";
import { useDeleteFood, useGetFoods } from "@queries/foods";
import { useGetCategories } from "@queries/categories";

// Arbeta med filer i formulär

// Ändra våra _Input i foodform till Input sedan commita.

const DEFAULT_CATEGORY: Category = {
  id: "",
  name: "All Categories",
};
const DEFAULT_SORT_COLUMN: SortColumn = {
  path: "name",
  order: "asc",
};
const PAGE_SIZE = 4;

export default function Foods() {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data: foods = [] } = useGetFoods();
  const { mutate: handleDelete } = useDeleteFood();
  const { data: categories = [] } = useGetCategories();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);
  const [searchQuery, setSearchQuery] = useState("");
  const user = auth.getCurrentUser();

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          isFavorite: !food.isFavorite,
        };
      }

      return food;
    });

    console.log(newFoods);

    //  setFoods(newFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSearchQuery("");
    setSelectedPage(1);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setSelectedCategory(DEFAULT_CATEGORY);
    setSelectedPage(1);
  }

  const filteredFoods = searchQuery
    ? foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : selectedCategory.id
      ? foods.filter((food) => food.category.id === selectedCategory.id)
      : foods;

  const sortedFoods = _.orderBy(
    filteredFoods,
    sortColumn.path,
    sortColumn.order,
  );

  const paginatedFoods = paginate(sortedFoods, PAGE_SIZE, selectedPage);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={[DEFAULT_CATEGORY, ...categories]}
            selectedItem={selectedCategory}
            onItemSelect={handleCategorySelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/foods/new" className="btn btn-primary mb-2">
              New Food
            </Link>
          )}
          <p>Showing {filteredFoods.length} foods in the database</p>
          <SearchBox searchQuery={searchQuery} onSearch={handleSearch} />
          <FoodsTable
            foods={paginatedFoods}
            sortColumn={sortColumn}
            onSort={setSortColumn}
            onDelete={handleDelete}
            onFavor={handleFavor}
          />
          <div className="mt-4">
            <Pagination
              totalCount={filteredFoods.length}
              pageSize={PAGE_SIZE}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
