import { useCallback, useState } from 'react';
import { Checkbox, ScrollArea, Skeleton, Table } from '@mantine/core';
import MultiSelectCheckboxWidget from '@/components/molecules/widgets/MultiSelectCheckboxWidget';
import type { MJRecord, MJTableColumn, TPostApiResponse } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/helpers/helpers';
import { MJPagination } from '../pagination/MJPagination';

type MJTableProps = {
  columns: MJTableColumn[];
  data: MJRecord[] | undefined;
  maxTableHeight?: number;
  highlightOnHover?: boolean;
  loading?: boolean;
  handleSelectRow?: (row: MJRecord) => void;
  activePage: number;
  setPage: (page: number) => void;
  totalPages: number;
  totalCount: number;
  isCheckboxSelection?: boolean;
  bulkConfirmAction?: (selected: string[]) => Promise<TPostApiResponse<{ message: string }>>;
  bulkConfirmLoading?: boolean;
};

export const MJTable = ({
  columns,
  data,
  maxTableHeight = 600,
  highlightOnHover = true,
  loading,
  handleSelectRow,
  activePage,
  setPage,
  totalPages,
  isCheckboxSelection,
  bulkConfirmAction,
  bulkConfirmLoading,
}: MJTableProps) => {
  let renderTableContent: React.ReactNode;

  const [selection, setSelection] = useState<string[]>([]);

  const currencyAccessors = ['price', 'discountPrice'];

  const toggleRow = (id: string) =>
    setSelection &&
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = useCallback(() => {
    if (setSelection) {
      setSelection((current) =>
        current.length === data?.length ? [] : (data?.map((item) => String(item.id)) ?? [])
      );
    }
  }, [data, setSelection]);

  const handleRenderCellValue = (column: MJTableColumn, cellValue: MJRecord): React.ReactNode => {
    if (column.render) {
      return column.render(cellValue);
    }
    if (column.isImageAccessor) {
      return (
        <img
          src={String(cellValue[column.accessorKey])}
          alt="image"
          className=" rounded-lg w-10 h-10 object-cover"
        />
      );
    }
    if (currencyAccessors.includes(column.accessorKey)) {
      return formatCurrency(Number(cellValue[column.accessorKey]));
    }
    return cellValue[column.accessorKey] as React.ReactNode;
  };

  const renderHeader = useCallback(() => {
    const newColumns = columns.map((column) => {
      return (
        <Table.Th key={column.accessorKey}>
          {column.accessorKey === 'actions' ? '' : column.label}
        </Table.Th>
      );
    });

    if (isCheckboxSelection) {
      return [
        <Table.Th key="checkbox" style={{ width: 40 }}>
          <Checkbox
            onChange={toggleAll}
            checked={selection?.length === data?.length}
            indeterminate={selection && selection?.length > 0 && selection?.length !== data?.length}
            aria-label="Select all rows"
          />
        </Table.Th>,
        ...newColumns,
      ];
    }

    return newColumns;
  }, [isCheckboxSelection, columns, data, selection, toggleAll]);

  if (loading) {
    renderTableContent = Array.from({ length: 10 }).map((_, index) => {
      return (
        <Table.Tr key={index}>
          {columns.map((column) => (
            <Table.Td key={column.accessorKey}>
              <Skeleton height={16} />
            </Table.Td>
          ))}
        </Table.Tr>
      );
    });
  } else {
    renderTableContent = data?.map((row, rowIndex) => {
      return (
        <Table.Tr
          key={rowIndex}
          onClick={(e) => {
            e.stopPropagation();
            if (handleSelectRow) handleSelectRow(row);
          }}
        >
          {isCheckboxSelection && (
            <Table.Td>
              <Checkbox
                checked={selection?.includes(row?.id as string)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleRow(row?.id as string);
                }}
                aria-label="Select row"
              />
            </Table.Td>
          )}
          {columns.map((column) => {
            const renderedValue = handleRenderCellValue(column, row);
            return <Table.Td key={column.accessorKey}>{renderedValue}</Table.Td>;
          })}
        </Table.Tr>
      );
    });
  }

  return (
    <>
      <ScrollArea.Autosize mah={maxTableHeight}>
        <Table highlightOnHover={highlightOnHover} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>{renderHeader()}</Table.Tr>
          </Table.Thead>
          <Table.Tbody>{renderTableContent}</Table.Tbody>
        </Table>
      </ScrollArea.Autosize>
      {totalPages > 1 && data && data.length > 0 && (
        <MJPagination page={activePage} setPage={setPage} numOfPages={totalPages} />
      )}
      {isCheckboxSelection && (
        <MultiSelectCheckboxWidget
          onConfirm={async () =>
            bulkConfirmAction && (await bulkConfirmAction(selection as string[]))
          }
          loading={bulkConfirmLoading}
          opened={(selection && selection?.length > 0) as boolean}
          onClose={() => setSelection?.([])}
          text={`${selection?.length} item(s) selected`}
        />
      )}
    </>
  );
};
