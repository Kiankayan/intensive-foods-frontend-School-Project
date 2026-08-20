import type { Column, Food, SortColumn } from "@types";
import { Favorite, Table } from "@components/common";
import { Link } from "react-router-dom";
import { auth } from "@services";

interface Props {
  foods: Food[];

  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
  onDelete: (id: string) => void;
  onFavor: (id: string) => void;
}

function FoodsTable({ foods, sortColumn, onSort, onDelete, onFavor }: Props) {
  const user = auth.getCurrentUser();
  console.log(user);

  const columns: Column<Food>[] = [
    {
      key: "image",
      content: (food) => (
        <img src={food.imageUrl} alt="product image" width={40} />
      ),
    },

    {
      key: "name",
      path: "name",
      label: "Name",
      content: (food) => <Link to={`/foods/${food.id}`}>{food.name}</Link>,
    },

    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },

    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavored={food.isFavorite}
          onClick={() => onFavor(food.id)}
        />
      ),
    },

    {
      key: "delete",
      content: (food) => (
        <>
          {user?.isAdmin && (
            <button
              className="btn btn-danger"
              onClick={() => onDelete(food.id)}
            >
              Delete
            </button>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      items={foods}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default FoodsTable;
