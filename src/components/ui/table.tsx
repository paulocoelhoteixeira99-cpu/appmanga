import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type TableDensity = "comfortable" | "compact";

const densityCell: Record<TableDensity, string> = {
  comfortable: "px-4 py-3",
  compact: "px-3 py-3",
};

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...props }, ref) {
    return (
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={cn("w-full border-collapse text-sm", className)}
          {...props}
        />
      </div>
    );
  }
);

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={cn("bg-neutral-100 border-b border-neutral-200", className)}
        {...props}
      />
    );
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return (
      <tbody
        ref={ref}
        className={cn("divide-y divide-neutral-200", className)}
        {...props}
      />
    );
  }
);

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  interactive?: boolean;
  selected?: boolean;
  striped?: boolean;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ className, interactive, selected, striped, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors",
          interactive && "cursor-pointer hover:bg-primary-50 active:bg-primary-100",
          selected && "bg-primary-50",
          striped && "even:bg-neutral-50",
          className
        )}
        {...props}
      />
    );
  }
);

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  density?: TableDensity;
  sortDirection?: "ascending" | "descending" | "none";
}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ className, density = "comfortable", sortDirection, children, ...props }, ref) {
    return (
      <th
        ref={ref}
        className={cn(
          "text-left text-sm font-semibold text-neutral-900",
          densityCell[density],
          sortDirection && "cursor-pointer select-none hover:text-neutral-900",
          className
        )}
        {...props}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          {sortDirection === "ascending" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
              <path d="M7 14l5-5 5 5z" />
            </svg>
          )}
          {sortDirection === "descending" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          )}
        </span>
      </th>
    );
  }
);

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  density?: TableDensity;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, density = "comfortable", ...props }, ref) {
    return (
      <td
        ref={ref}
        className={cn(
          "text-sm text-neutral-900",
          densityCell[density],
          className
        )}
        {...props}
      />
    );
  }
);

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  type TableDensity,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
};
