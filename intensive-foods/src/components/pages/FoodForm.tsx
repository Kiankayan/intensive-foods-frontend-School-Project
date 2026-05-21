import { useNavigate, useParams } from "react-router-dom";

export default function FoodForm(): React.ReactElement {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <>
      <h1>Food Form {id}</h1>

      <button className="btn btn-primary" onClick={() => navigate("/foods")}>
        Save
      </button>
    </>
  );
}
