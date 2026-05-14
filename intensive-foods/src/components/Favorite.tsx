interface Props {
  isFavored: boolean;
  onClick: () => void;
}

function Favorite({ isFavored, onClick }: Props): React.ReactElement {
  return (
    <i
      className={`fa-star fa-${isFavored ? "solid" : "regular"}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
}

export default Favorite;
