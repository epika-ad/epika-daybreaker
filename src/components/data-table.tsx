import { type ReactNode, useState } from "react";
import { ChevronDownIcon, SearchIcon } from "../icons";
import { cn } from "../utils";
import { Input } from "./input";
import { InputGroup, InputGroupAddon } from "./input-group";
import { Pagination } from "./pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

type Sort<Row> = { key: keyof Row & string; descending: boolean } | null;

/**
 * A table that sorts, filters and paginates rows it is given. For anything
 * server-driven, compose `Table` yourself.
 */
export const DataTable = <Row extends Record<string, unknown>>({
  columns,
  rows,
  rowKey,
  pageSize = 5,
  searchable = true,
  empty = "No results",
  className,
}: DataTable.Props<Row>) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort<Row>>(null);
  const [page, setPage] = useState(1);

  const needle = query.trim().toLowerCase();
  const matching = needle
    ? rows.filter((row) =>
        columns.some((column) =>
          String(row[column.key]).toLowerCase().includes(needle),
        ),
      )
    : rows;
  const sorted = sort
    ? [...matching].sort((a, b) => {
        const [x, y] = [a[sort.key], b[sort.key]];
        const order =
          typeof x === "number" && typeof y === "number"
            ? x - y
            : String(x).localeCompare(String(y), undefined, { numeric: true });
        return sort.descending ? -order : order;
      })
    : matching;
  const count = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, count);
  const visible = sorted.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div className={cn("grid w-full gap-3", className)}>
      {searchable && (
        <InputGroup className="max-w-xs">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <Input
            aria-label="Filter rows"
            placeholder="Filter…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </InputGroup>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const active = sort?.key === column.key;
              return (
                <TableHead
                  key={column.key}
                  aria-sort={
                    active
                      ? sort.descending
                        ? "descending"
                        : "ascending"
                      : undefined
                  }
                  className={cn(column.align === "right" && "text-right")}
                >
                  {column.sortable === false ? (
                    column.header
                  ) : (
                    <button
                      type="button"
                      className={cn(
                        "inline-flex cursor-pointer items-center gap-1 rounded-item transition-colors hover:text-foreground",
                        active && "text-foreground",
                      )}
                      // unsorted, then ascending, then descending, then back
                      onClick={() =>
                        setSort(
                          !active
                            ? { key: column.key, descending: false }
                            : sort.descending
                              ? null
                              : { key: column.key, descending: true },
                        )
                      }
                    >
                      {column.header}
                      <ChevronDownIcon
                        className={cn(
                          "size-3.5 opacity-0 transition-[rotate,opacity] duration-400 ease-spring",
                          active && "opacity-100",
                          active && !sort.descending && "rotate-180",
                        )}
                      />
                    </button>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((row) => (
            <TableRow key={rowKey(row)}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  className={cn(
                    column.align === "right" && "text-right tabular-nums",
                  )}
                >
                  {column.cell ? column.cell(row) : String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {visible.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-8 text-center text-foreground-dimmed"
              >
                {empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-foreground-dimmed text-sm tabular-nums">
          {sorted.length} {sorted.length === 1 ? "row" : "rows"}
        </p>
        {count > 1 && (
          <Pagination page={current} count={count} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};
export namespace DataTable {
  export type Column<Row> = {
    /** The row field this column reads, sorts and filters by. */
    key: keyof Row & string;
    header: ReactNode;
    /** Renders the cell; defaults to the field as text. */
    cell?: (row: Row) => ReactNode;
    sortable?: boolean;
    align?: "left" | "right";
  };
  export type Props<Row> = {
    columns: readonly Column<Row>[];
    rows: readonly Row[];
    /** A stable, unique id for a row. */
    rowKey: (row: Row) => string;
    pageSize?: number;
    /** Shows the filter box above the table. */
    searchable?: boolean;
    /** Shown when no row matches the filter. */
    empty?: ReactNode;
    className?: string;
  };
}
