function getPagination(currentPage, totalPages, delta = 1) {
  const range = [];
  const rangeWithDots = [];

  const left = currentPage - delta;
  const right = currentPage + delta;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      range.push(i);
    }
  }

  let prev;

  for (let i of range) {
    if (prev) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (i - prev > 2) {
        rangeWithDots.push("...");
      }
    }

    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
}

function Pagination({ currentPage, totalPages, setPage }) {
  const pages = getPagination(currentPage, totalPages);

  return (
    <div className="flex gap-2 justify-center">
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}

export default Pagination;
