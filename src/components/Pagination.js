import { Button, ButtonGroup } from "react-bootstrap";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ButtonGroup>
      {pages.map((page) => (
        <Button
          key={page}
          variant="outline-primary"
          onClick={() => onPageChange(page)}
          active={currentPage === page}
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default Pagination;