import { type Category } from "../../services/fakeCategoryService";

interface Props {
  items: Category[];
  selectedItem: Category;
  onSelectItem: (item: Category) => void;
}

function ListGroup({
  items,
  selectedItem,
  onSelectItem,
}: Props): React.ReactElement {
  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item._id}
          type="button"
          className={`list-group-item list-group-item-action ${
            selectedItem._id === item._id ? "active" : ""
          }`}
          onClick={() => onSelectItem(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ListGroup;
