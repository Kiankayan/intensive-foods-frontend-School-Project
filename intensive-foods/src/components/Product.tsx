import { useEffect, useState } from "react";
import { getFoods } from "../../services/fakeFoodService";

interface Category {
  _id: string;
  name: string;
}

interface Food {
  _id: string;
  name: string;
  category: Category;
  numberInStock: number;
  price: number;

  isFavorite: boolean;
}

function Product(): React.ReactElement {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const data = getFoods().map((food) => ({
      ...food,
      isFavorite: false,
    }));
    setFoods(data);
  }, []);

  const handleDelete = (id: string) => {
    const updatedFoods = foods.filter((food) => food._id !== id);
    setFoods(updatedFoods);
  };

  const toggleFavorite = (id: string) => {
    const updatedFoods = foods.map((food) => {
      if (food._id === id) {
        return { ...food, isFavorite: !food.isFavorite };
      }
      return food;
    });
    setFoods(updatedFoods);
  };

  return (
    <div>
      {foods.length === 0 ? (
        <p>There are no foods in the database</p>
      ) : (
        <p>Showing {foods.length} foods in the database</p>
      )}

      {foods.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
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
                  <i
                    className={
                      food.isFavorite
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                    }
                    style={{
                      cursor: "pointer",
                      color: food.isFavorite ? "black" : "gray",
                    }}
                    onClick={() => toggleFavorite(food._id)}
                  ></i>
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
    </div>
  );
}
export default Product;
