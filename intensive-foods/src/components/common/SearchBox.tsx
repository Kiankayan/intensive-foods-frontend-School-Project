interface Props {
  searchQuery: string;
  onSearch: (query: string) => void;
}

function SearchBox({ searchQuery, onSearch }: Props) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBox;
