import { useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { paginate } from "@/utils";
import { FoodsTable } from "@components";
import type { Category, Food, SortColumn } from "@/types";
import { ListGroup, Pagination, SearchBox } from "@/components/common";
import { getCategories, getFoods, deleteFood } from "@services";

const DEFAULT_CATEGORY: Category = {
  _id: "",
  name: "All Categories",
};
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };

const PAGE_SIZE = 4;

export default function Foods() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<Food[]>(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);
  const [searchQuery, setSearchQuery] = useState("");

  function handleDelete(foodId: string) {
    deleteFood(foodId);

    setFoods(foods.filter((f) => f._id !== foodId));
  }

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food._id === id) {
        return {
          ...food,
          isFavorite: !food.isFavorite,
        };
      }

      return food;
    });

    setFoods(newFoods);
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

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  const filteredFoods = searchQuery
    ? foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : selectedCategory._id
      ? foods.filter((food) => food.category._id === selectedCategory._id)
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
            items={[DEFAULT_CATEGORY, ...getCategories()]}
            selectedItem={selectedCategory}
            onItemSelect={handleCategorySelect}
          />
        </div>

        <div className="col-9">
          {foods.length === 0 ? (
            <p>There are no foods in the database</p>
          ) : (
            <>
              <button
                className="btn btn-primary mb-3"
                onClick={() => navigate("/foods/new")}
              >
                New Food
              </button>

              <p>Showing {filteredFoods.length} foods in the database</p>

              <SearchBox searchQuery={searchQuery} onSearch={handleSearch} />
            </>
          )}

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
