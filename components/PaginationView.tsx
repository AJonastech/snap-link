"use client"
import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "./ui/pagination"; // adjust import path as needed

interface PaginationViewProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
    showIfEmpty?: boolean;
}

function PaginationView({
    currentPage,
    totalPages,
    hasNextPage,
    onPageChange,
    isLoading = false,
    showIfEmpty = false,
}: PaginationViewProps) {
    if ((totalPages === 0 && !showIfEmpty) || isLoading || totalPages ===1) {
        return null;
    }

    return (
        <Pagination className="mt-3">
            <PaginationContent>
               {
                currentPage !==1 &&( <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                    />
                </PaginationItem>)
               }
                
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => onPageChange(pageNumber)}
                                    isActive={currentPage === pageNumber}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                        return <PaginationEllipsis key={index} />;
                    }
                    return null;
                })}

               {
                hasNextPage && (
                    <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => hasNextPage && onPageChange(currentPage + 1)}
                        aria-disabled={!hasNextPage}
                    />
                </PaginationItem>
                )
               }
            </PaginationContent>
        </Pagination>
    );
}

export default PaginationView;