"use client"; // Ensure client-side rendering

import React from "react";
import {
  useTable,
  useSortBy,
  Column,
  usePagination,
  HeaderGroup,
  ColumnInstance,
  Row,
  Cell
} from "react-table";

interface CricketFeedData {
  date: string;
  feedAmount: number;
}

interface CricketFeedTableProps {
  data: CricketFeedData[];
}

const CricketFeedTable: React.FC<CricketFeedTableProps> = ({ data }) => {
  const columns: Column<CricketFeedData>[] = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Feed Amount",
        accessor: "feedAmount",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    pageOptions,
  } = useTable<CricketFeedData>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="m-auto mt-3 w-full max-w-xl flex-col items-center justify-center gap-3 rounded-lg border-2 bg-slate-50 p-8 px-4 lg:px-8">
      {/* Overflow container for horizontal scroll */}
      <div className="overflow-x-auto w-full">
        <table {...getTableProps()} className="min-w-full border">
          <thead>
          {headerGroups.map((headerGroup: HeaderGroup<CricketFeedData>) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-200"
            >
              {headerGroup.headers.map((column: ColumnInstance<CricketFeedData>) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 border"
                >
                  {column.render("Header")}
                  <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {page.map((row: Row<CricketFeedData>) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map((cell: Cell<CricketFeedData>) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-2 w-full">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CricketFeedTable;
