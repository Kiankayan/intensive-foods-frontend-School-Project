import type { SortColumn } from "./FoodsTable";

interface Props {
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

function TableHeader({ onSort, sortColumn }: Props) {
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
    <thead>
      <tr>
        <th onClick={() => handleSort("name")}> Name</th>
        <th onClick={() => handleSort("category.name")}>Category</th>
        <th onClick={() => handleSort("price")}>Price</th>
        <th onClick={() => handleSort("numberInStock")}>Stock</th>

        <th></th>
      </tr>
    </thead>
  );
}

export default TableHeader;
