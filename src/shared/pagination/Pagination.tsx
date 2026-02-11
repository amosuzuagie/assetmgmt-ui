interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ page, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-4">
            <button
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Prev
            </button>

            <span>
                Page {page + 1} of {totalPages}
            </span>

            <button
                disabled={page + 1 >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};