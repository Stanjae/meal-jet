import { Pagination } from '@mantine/core';
import { usePagination } from '@mantine/hooks';

type MJPaginationProps = {
  numOfPages: number;
  page: number;
  setPage: (page: number) => void;
};

export const MJPagination = ({ numOfPages, page, setPage }: MJPaginationProps) => {
  const pagination = usePagination({ total: numOfPages, page, onChange: setPage });

  // Will call onChange with 5
  //pagination.setPage(5);
  //pagination.range; // -> [1, 'dots', 4, 5, 6, 'dots', 10];
  return (
    <div>
      <Pagination value={page} onChange={pagination.setPage} total={numOfPages} />
    </div>
  );
};
