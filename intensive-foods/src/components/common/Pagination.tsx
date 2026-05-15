import { range } from "../../utils";
interface Props {
  totalCount: number;
  pageSize: number;
  selectedPage: number;
  setSelectedPage: (page: number) => void;
}

function Pagination({
  totalCount,
  pageSize,
  selectedPage,
  setSelectedPage,
}: Props) {
  const pagesCount = Math.ceil(totalCount / pageSize);

  const pages = range(1, pagesCount);

  if (pagesCount === 1) return null;

  return (
    <nav aria-label="Pagination">
      <ul className="pagination pagination-sm">
        {pages.map((page) => (
          <li
            key={page}
            className={selectedPage === page ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => setSelectedPage(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
