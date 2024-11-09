import React from 'react'
import { TableCell, TableRow } from './ui/table'

function LinksTableLoader() {
  return (
  Array.from({ length: 5 }).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </TableCell>
      </TableRow>
  )))
}

export default LinksTableLoader