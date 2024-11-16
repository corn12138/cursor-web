import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import React, { forwardRef } from 'react';

import { ButtonProps, buttonVariants } from "@/components/ui/button";//导入ButtonProps类型
import { cn } from "@/utils/cn";//导入cn函数

import { Link } from "@/components/ui/link";//导入Link组件

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role='navigation'
        aria-label='Pagination'
        className={cn('mx-auto flex w-full justify-center', className)}
        {...props}
    ></nav>
); //这是一个Pagination组件，它接受一个className属性，它是一个React组件，它返回一个nav元素
Pagination.displayName = 'Pagination';//Pagination组件的显示名称为Pagination

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn('flex flex-row items-center gap-2', className)}
        {...props}
    ></ul>
));//这是一个PaginationContent组件，它是一个React组件，它接受一个className属性，它返回一个ul元素
PaginationContent.displayName = 'PaginationContent';//PaginationContent组件的显示名称为PaginationContent

const PaginationItem = forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn('', className)}
        {...props}
    ></li>
));//这是一个PaginationItem组件，它是一个React组件，它接受一个className属性，它返回一个li元素
PaginationItem.displayName = 'PaginationItem';//PaginationItem组件的显示名称为PaginationItem

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, 'size'> & React.ComponentProps<'a'>;//定义PaginationLinkProps类型，它继承了ButtonProps类型，它有一个isActive属性，它是一个布尔值

const PaginationLink = ({
    className,
    isActive,
    size = 'icon',
    children,
    href,
    ...props
}: PaginationLinkProps) => (
    <Link
        to={href as string}
        aria-current={isActive ? 'page' : undefined}
        className={cn(buttonVariants({ variant: isActive ? 'outline' : "ghost", size }), className)}
        {...props}
    >
        {children}
    </Link>
);//这是一个PaginationLink组件，它接受一个className、isActive、size、children、href属性，它是一个React组件，它返回一个Link组件
PaginationLink.displayName = 'PaginationLink';//PaginationLink组件的显示名称为PaginationLink

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label='go to previous page'
        size='default'
        className={cn('gap-1 pl-2.5', className)}
        {...props}
    >
        <ChevronLeftIcon className='size-4' />
        <span>返回上一页(Previous)</span>
    </PaginationLink>
);//这是一个PaginationPrevious组件，它接受一个className、children属性，它是一个React组件，它返回一个button元素
PaginationPrevious.displayName = 'PaginationPrevious';//PaginationPrevious组件的显示名称为PaginationPrevious

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label='go to next page'
        size='default'
        className={cn('gap-1 pr-2.5', className)}
        {...props}
    >
        <span>下一页(Next)</span>
        <ChevronRightIcon className='size-4' />
    </PaginationLink>
);//这是一个PaginationNext组件，它接受一个className、children属性，它是一个React组件，它返回一个button元素
PaginationNext.displayName = 'PaginationNext';//PaginationNext组件的显示名称为PaginationNext

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<'span'>) => (
    <span
        aria-hidden
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <DotsHorizontalIcon className='size-4' />
        <span className='sr-only'>更多页(More pages)</span>
    </span>
);//这是一个PaginationEllipsis组件，它接受一个className属性，它是一个React组件，它返回一个span元素
PaginationEllipsis.displayName = 'PaginationEllipsis';//PaginationEllipsis组件的显示名称为PaginationEllipsis

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};

export type TablePaginationProps = {
    // className?: string;
    // totalItems: number;
    // itemsPerPage: number;
    // currentPage: number;
    // totalPages: number;
    // rootUrl: string;
    // onPageChange: (page: number) => void;
    totalPages: number;
    currentPage: number;
    rootUrl: string;
}; //定义TablePaginationProps类型，它有一个className、totalItems、itemsPerPage、currentPage、totalPages、rootUrl、onPageChange属性

export const TablePagination = ({
    totalPages,
    currentPage,
    rootUrl
}: TablePaginationProps) => {
    const createHref = (page: number) => `${rootUrl}?page=${page}`;
    return (
        <>
            <Pagination className='justify-end py-8'>
                <PaginationContent>
                    {currentPage > 1 && (
                        <PaginationItem>
                            <PaginationPrevious href={createHref(currentPage - 1)} /> {/*上一页*/}
                        </PaginationItem>
                    )}
                    {currentPage > 2 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>)} {/*省略号*/}
                    {currentPage > 1 && (<PaginationItem>
                        <PaginationLink href={createHref(currentPage - 1)}></PaginationLink>
                    </PaginationItem>)} {/*当前页*/}
                    <PaginationItem className='rounded-sm bg-gray-200'>
                        <PaginationLink href={createHref(currentPage)}>
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    {totalPages > currentPage && (
                        <PaginationItem>
                            <PaginationLink href={createHref(currentPage + 1)}>
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )} {/*下一页*/}
                    {totalPages > currentPage + 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )} {/*省略号*/}
                    {currentPage < totalPages && (
                        <PaginationItem>
                            <PaginationNext href={createHref(totalPages)}></PaginationNext>
                        </PaginationItem>
                    )} {/*下一页*/}
                </PaginationContent>

            </Pagination>
        </>
    )
}