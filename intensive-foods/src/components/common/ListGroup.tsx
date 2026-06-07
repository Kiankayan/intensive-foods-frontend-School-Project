interface Item {
  id: string;
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
          key={item.id}
          type="button"
          className={`list-group-item list-group-item-action ${
            selectedItem.id === item.id ? "active" : ""
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
