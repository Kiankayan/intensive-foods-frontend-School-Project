import type { Food } from "../../services/fakeFoodService";

import TableBody from "./TableBody";
import TableHeader, { type Column } from "./TableHeader";

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
  const columns: Column[] = [
    { path: "name", label: "Name" },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    { key: "favorite" },
    { key: "delete" },
  ];

  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody
        foods={foods}
        columns={columns}
        onDelete={onDelete}
        onFavor={onFavor}
      />
    </table>
  );
}

export default FoodsTable;
