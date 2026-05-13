interface Item {
  _id: string;
  name: string;
}

interface Props<T extends Item> {
  items: T[];
  selectedItem: T;
  onItemSelect(item: T): void;
}

function ListGroup<T extends Item>({
  items,
  selectedItem,
  onItemSelect,
}: Props<T>) {
  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item._id}
          type="button"
          className={`list-group-item list-group-item-action ${
            selectedItem._id === item._id ? "active" : ""
          }`}
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default ListGroup;
