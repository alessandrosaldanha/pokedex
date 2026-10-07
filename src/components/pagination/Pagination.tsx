import Pagination from "react-bootstrap/Pagination";

interface PaginacaoProps {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Paginacao({ activePage, totalPages, onPageChange }: PaginacaoProps) {
  let items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination className="justify-content-center w-100 mt-4">
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={activePage === 1}
      />
      <Pagination.Prev
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage === 1}
      />
      {items}
      <Pagination.Next
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage === totalPages}
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
}

export default Paginacao;
