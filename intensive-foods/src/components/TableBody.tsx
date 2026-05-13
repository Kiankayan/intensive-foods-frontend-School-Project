import type { Food } from "../../services/fakeFoodService";

import _ from "lodash";
import type { Column } from "./TableHeader";

interface Props {
  foods: Food[];
  columns: Column[];
  onDelete: (id: string) => void;
  onFavor: (id: string) => void;
}

function TableBody({ foods, columns }: Props) {
  return (
    <tbody className="table-group-divider">
      {foods.map((food) => (
        <tr key={food._id}>
          {columns.map((column) =>
            "path" in column ? (
              <td key={column.path}>{_.get(food, column.path)}</td>
            ) : (
              <td key={column.key}>{column.content(food)}</td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
