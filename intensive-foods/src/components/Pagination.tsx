import { useState } from "react";

function Pagination(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <nav aria-label="Pagination">
      <ul className="pagination pagination-sm">
        <li className={currentPage === 1 ? "page-item active" : "page-item"}>
          <button className="page-link" onClick={() => setCurrentPage(1)}>
            1
          </button>
        </li>

        <li className={currentPage === 2 ? "page-item active" : "page-item"}>
          <button className="page-link" onClick={() => setCurrentPage(2)}>
            2
          </button>
        </li>

        <li className={currentPage === 3 ? "page-item active" : "page-item"}>
          <button className="page-link" onClick={() => setCurrentPage(3)}>
            3
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
