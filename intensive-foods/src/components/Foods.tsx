import { useState } from "react";
import { getFoods } from "../../services/fakeFoodService";
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

// Paginering

// Börja med att skapa en Utility fil i src mappen som "Utils.ts". Utility functions eller helper functions är funktion som hjälper oss att åstadkomma saker men som är generella.

export default function Foods() {
  const [foods, setFoods] = useState(getFoods());

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
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Favorite</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {foods.map((food) => (
                  <tr key={food._id}>
                    <td>{food.name}</td>

                    <td>{food.category.name}</td>

                    <td>{food.numberInStock}</td>

                    <td>{food.price}</td>

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
              pageSize={4}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
