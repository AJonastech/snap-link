import React from 'react'
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from './ui/card'
import { TableHead, TableRow, TableHeader, TableBody, TableCell, Table } from './ui/table'
import { Click as TClick } from '@prisma/client'
import { PaginationEllipsis, Pagination, PaginationContent,PaginationPrevious, PaginationItem, PaginationLink, PaginationNext } from './ui/pagination'
import PaginationView from './PaginationView'
function ClickTable({
    clickData,
    handlePageChange,
    pagination,
    page
}: { clickData: TClick[], page:number ,  handlePageChange:(page:number)=>void,pagination: {currentPage: number;
    totalPages: number;
    totalClicks: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;}}) {
    return (
        <Card className="md:col-span-2 relative">
            <CardHeader>
                <CardTitle>Click Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Device</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clickData.map((click) => (
                            <TableRow key={click.id}>
                                <TableCell>{click.date.toLocaleString()}</TableCell>
                                <TableCell>{click.location}</TableCell>
                                <TableCell>{click.device}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
         <div className=' absolute bottom-3 -translate-x-1/2 left-1/2 mx-auto'>
          <PaginationView
          onPageChange={handlePageChange}
          totalPages={pagination.totalPages}
          showIfEmpty={false}
          currentPage={page}
          hasNextPage={pagination.hasNextPage}
          isLoading={!clickData}
          />
         </div>
        </Card>
    )
}

export default ClickTable
