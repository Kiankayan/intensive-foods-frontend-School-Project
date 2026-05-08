interface Props {
  isFavorite: boolean;
  onClick: () => void;
}

function Favorite({ isFavorite, onClick }: Props): React.ReactElement {
  return (
    <i
      className={`fa-star fa-${isFavorite ? "solid" : "regular"}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
}

export default Favorite;
