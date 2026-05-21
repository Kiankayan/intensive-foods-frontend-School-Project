import { NavLink } from "react-router-dom";

export default function NavBar(): React.ReactElement {
  return (
    <nav className="navbar bg-body-tertiary mb-4 px-3">
      <div className="d-flex align-items-center">
        <NavLink className="navbar-brand mb-0 me-4" to="/foods">
          Intensive Foods
        </NavLink>

        <NavLink
          to="/foods"
          className={({ isActive }) =>
            isActive
              ? "nav-link active fw-bold me-3"
              : "nav-link text-secondary me-3"
          }
        >
          Foods
        </NavLink>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            isActive
              ? "nav-link active fw-bold me-3"
              : "nav-link text-secondary me-3 "
          }
        >
          Customers
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "nav-link active fw-bold" : "nav-link text-secondary"
          }
        >
          Orders
        </NavLink>
      </div>
    </nav>
  );
}
