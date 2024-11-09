import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

function ClickTableSkeleton() {
  return (
    <Card className="md:col-span-2">
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
                {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"/>
                        </TableCell>
                        <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"/>
                        </TableCell>
                        <TableCell>
                            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </CardContent>
</Card>
  )
}

export default ClickTableSkeleton