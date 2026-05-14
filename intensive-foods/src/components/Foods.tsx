import { useState } from "react";
import _ from "lodash";
import { paginate } from "../utils";
import { getFoods, type Food } from "../../services/fakeFoodService";
import { getCategories } from "../../services/fakeCategoryService";

import Pagination from "./Pagination";
import ListGroup from "./ListGroup";
import FoodsTable from "./FoodsTable";
import type { Category, SortColumn } from "../types";

// Types

// Skapa en fil där man endast håller koll på typerna. tryck på src mappen sen skapa fil med namnet "types.ts".

// Tack var det TypeScript så kommer typerna vara ganska enkel eftersom vi ska endast klipp in alla typer i types.ts filen sen lösa alla error som dyker upp.

// Tips är att CTRL + högerklicka med musen för att hitta typerna i komponenterna tex i Table.tsx.

// Efter ha importerat typerna för varje komponent så kan man öppna terminalen och trycka på "PROBLEMS" för att se om det finns några problem i de andra komonenterna i projektet. Detta underlättar mycket för att hitta errors.

const DEFAULT_CATEGORY: Category = {
  _id: "",
  name: "All Categories",
};
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };

const PAGE_SIZE = 4;

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

  function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food._id !== id);

    setFoods(newFoods);
  }

  function handleFavor(id: string) {
    const updatedFoods = foods.map((food) => {
      if (food._id === id) {
        return {
          ...food,
          isFavorite: !food.isFavorite,
        };
      }

      return food;
    });

    setFoods(updatedFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  const filteredFoods = selectedCategory._id
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
            <p>Showing {filteredFoods.length} foods in the database</p>
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
