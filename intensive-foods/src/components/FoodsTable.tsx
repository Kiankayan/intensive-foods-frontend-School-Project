import type { Food } from "../../services/fakeFoodService";
import Favorite from "./Favorite";

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
  onDelete: (id: string) => void;
  onFavor: (id: string) => void;
}

function FoodsTable({ foods, sortColumn, onSort, onDelete, onFavor }: Props) {
  function handleSort(path: string) {
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    onSort({ ...sortColumn });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}> Name</th>
          <th onClick={() => handleSort("category.name")}>Category</th>
          <th onClick={() => handleSort("price")}>Price</th>
          <th onClick={() => handleSort("numberInStock")}>Stock</th>

          <th></th>
        </tr>
      </thead>

      <tbody className="table-group-divider">
        {foods.map((food) => (
          <tr key={food._id}>
            <td>{food.name}</td>

            <td>{food.category.name}</td>

            <td>{food.price}</td>

            <td>{food.numberInStock}</td>

            <td>
              <Favorite
                isFavorite={food.isFavorite}
                onClick={() => onFavor(food._id)}
              />
            </td>

            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(food._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FoodsTable;
