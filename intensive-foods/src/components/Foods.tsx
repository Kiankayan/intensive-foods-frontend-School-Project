import { useState } from "react";
import { paginate } from "../utils";
import { getFoods, type Food } from "../../services/fakeFoodService";
import {
  type Category,
  getCategories,
} from "../../services/fakeCategoryService";

import Pagination from "./Pagination";
import ListGroup from "./ListGroup";
import Favorite from "./Favorite";

const DEFAULT_CATEGORY: Category = {
  _id: "",
  name: "All Categories",
};
const PAGE_SIZE = 4;

// Paginering

// Börja med att skapa en Utility fil i src mappen som "Utils.ts". Utility functions eller helper functions är funktion som hjälper oss att åstadkomma saker men som är generella.

// Glöm inte att committa efter.

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

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

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  const paginatedFoods = paginate(foods, PAGE_SIZE, selectedPage);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={[DEFAULT_CATEGORY, ...getCategories()]}
            selectedItem={selectedCategory}
            onSelectItem={(category: Category) => setSelectedCategory(category)}
          />
        </div>

        <div className="col-9">
          {foods.length === 0 ? (
            <p>There are no foods in the database</p>
          ) : (
            <p>Showing {foods.length} foods in the database</p>
          )}

          {foods.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>

                  <th></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {paginatedFoods.map((food) => (
                  <tr key={food._id}>
                    <td>{food.name}</td>

                    <td>{food.category.name}</td>

                    <td>{food.price}</td>

                    <td>{food.numberInStock}</td>

                    <td>
                      <Favorite
                        isFavorite={food.isFavorite}
                        onClick={() => handleFavor(food._id)}
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(food._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-4">
            <Pagination
              totalCount={foods.length}
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
