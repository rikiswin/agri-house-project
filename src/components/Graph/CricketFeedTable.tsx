"use client"; // Ensure client-side rendering

import React from "react";
import {
  useTable,
  useSortBy,
  Column,
  usePagination,
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
    <>
      <table {...getTableProps()} className="min-w-full border">
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
            {headerGroup.headers.map((column) => (
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
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover:bg-gray-100">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="px-4 py-2 border">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex justify-between mt-2">
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
    </>
  );
};

export default CricketFeedTable;