import { useState } from "react";
import _ from "lodash";
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

// Sortering - Basic

// Sortering kan vara jobbigt att hantera manuellt men det finns en utility biblotek som gör det mycket enklare och den heter Lodash.

// Lodash har många utility funktioner bla range funktioner som vi byggde för pagination men det vi är intresserad är sortering och klicka på dokumentation i Lodash sen orderBy.

// Öppna upp terminalen för att installera Lodash så skriv "npm i lodash" sen därefter så importera man lodash i Foods.tsx högt upp med import _ from "lodash";. Det kommer dyka upp en error på importerings koden för att lösa det så skriver man igen i terminalen "npm i @types/lodash".

// Efter att ha gjort allt så commitar man "git add ." och "git commit -m "implemented basic sorting".

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState("name");

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

  const sortedFoods = _.orderBy(filteredFoods, sortColumn, "asc");

  const paginatedFoods = paginate(sortedFoods, PAGE_SIZE, selectedPage);

  console.log(sortColumn);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={[DEFAULT_CATEGORY, ...getCategories()]}
            selectedItem={selectedCategory}
            onSelectItem={handleCategorySelect}
          />
        </div>

        <div className="col-9">
          {foods.length === 0 ? (
            <p>There are no foods in the database</p>
          ) : (
            <p>Showing {filteredFoods.length} foods in the database</p>
          )}

          {foods.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => setSortColumn("name")}> Name</th>
                  <th onClick={() => setSortColumn("category.name")}>
                    Category
                  </th>
                  <th onClick={() => setSortColumn("price")}>Price</th>
                  <th onClick={() => setSortColumn("numberInStock")}>Stock</th>

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
