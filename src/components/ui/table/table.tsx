import { ArchiveX } from "lucide-react";
import React, { forwardRef } from "react";

import { BaseEntity } from "@/types/api";
import { cn } from "@/utils/cn";

import { TablePagination, TablePaginationProps } from "./pagination";

const TableElement = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={cn('w-full caption-bottom text-sm', className)} {...props}
        >

        </table>
    </div>
)); //此为原生table标签的封装
TableElement.displayName = 'Table';

const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn('[&_tr]:border-b', className)}
        {...props} />
)); //此为原生thead标签的封装
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<HTMLTableSectionElement, React.HtmlHTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props} />
)); //此为原生tbody标签的封装目的是为了更好的封装table
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
        {...props} />
)); //此为原生tfoot标签的封装
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
        {...props} />
)); //此为原生tr标签的封装
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn('h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
        {...props} />
)); //此为原生th标签的封装
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', className)}
        {...props} />
)); //此为原生td标签的封装
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn('mt-4 text-sm text-muted-foreground', className)}
        {...props} />
)); //此为原生caption标签的封装
TableCaption.displayName = 'TableCaption';

export {
    TableElement,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}

//
type TableColumn<Entry> = {
    title: string;
    field: keyof Entry;
    Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
    data: Entry[];
    columns: TableColumn<Entry>[]; //这是一个泛型数组
    pagination: TablePaginationProps;
};

//
export const Table = <Entry extends BaseEntity>({ data, columns, pagination }: TableProps<Entry>) => {
    if (!data.length) {
        return (
            <div className="flex h-80 flex-col items-center justify-center bg-white text-gray-500">
                <ArchiveX className="size-16" />
                <h4>未找到条目</h4>
            </div>
        );
    }

    return (
        <>
            <TableElement>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead key={column.title + index}>{column.title}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                {/*   */}
                <TableBody>
                    {data.map((entry, entryIndex) => (
                        <TableRow key={entry?.id || entryIndex}>
                            {columns.map(({ Cell, field, title }, columnIndex) => (
                                <TableCell key={title + columnIndex}>
                                    {Cell ? <Cell entry={entry} /> : `${entry[field]}`}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableElement>

            {pagination && <TablePagination {...pagination} />}
        </>
    );
}; //此为table的封装，其中包含了TableElement、TableHeader、TableBody、TableFooter、TableHead、TableRow、TableCell、TableCaption等组件