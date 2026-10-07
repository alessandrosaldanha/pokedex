import Pagination from "react-bootstrap/Pagination";

interface PaginacaoProps {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Paginacao({ activePage, totalPages, onPageChange }: PaginacaoProps) {
  // Define quantas páginas ao redor da página atual serão exibidas
  const maxPagesToShow = 2;

  let startPage = Math.max(1, activePage - maxPagesToShow);
  let endPage = Math.min(totalPages, activePage + maxPagesToShow);

  let items = [];

  // Se a primeira página não estiver no range, adiciona a página 1 e reticências
  if (startPage > 1) {
    items.push(
      <Pagination.Item key={1} onClick={() => onPageChange(1)}>
        1
      </Pagination.Item>,
    );
    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
    }
  }

  // Adiciona o bloco central de páginas
  for (let number = startPage; number <= endPage; number++) {
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

  // Se a última página não estiver no range, adiciona reticências e a última página
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
    }
    items.push(
      <Pagination.Item
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination className="justify-content-center w-100 mt-4 flex-wrap">
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
