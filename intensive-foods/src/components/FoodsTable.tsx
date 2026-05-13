import type { Food } from "../../services/fakeFoodService";
import Favorite from "./Favorite";

interface Props {
  foods: Food[];
  onSort: (path: string) => void;
  onDelete: (id: string) => void;
  onFavor: (id: string) => void;
}

function FoodsTable({ foods, onSort, onDelete, onFavor }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort("name")}> Name</th>
          <th onClick={() => onSort("category.name")}>Category</th>
          <th onClick={() => onSort("price")}>Price</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>

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
