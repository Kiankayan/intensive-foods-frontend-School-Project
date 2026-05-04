interface Props {
  isFavored: boolean;
  onFavor(): void;
}

function Favorite({ isFavored, onFavor }: Props) {
  return (
    <i
      className={`clickable fa-heart fa-${isFavored ? "solid" : "regular"}`}
      onClick={onFavor}
    />
  );
}
export default Favorite;
