import React from 'react'
import {TableCell ,TableRow } from './ui/table'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { Copy, Trash2 } from 'lucide-react'
import {Link as LinkType} from "@prisma/client"
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'



interface LinkWithCount extends LinkType {
  clickCount: number;
}

interface LinksTableProps {
  linkData: LinkWithCount[];
  openDeleteModal?: (link: string) => void;
}

function LinksTable({
    linkData,
    openDeleteModal
}:LinksTableProps) {
    const {toast} = useToast()
    return (
      <>
        {linkData.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="max-w-[200px] truncate">
              {link.originalUrl}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span className="text-blue-500">/{link.customId}</span>
                <Button variant="ghost" size="icon" onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/${link.customId}`);
                  toast({
                    title: "Copied!",
                    description: "Link copied to clipboard",
                  });
                }}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {link.isPasswordProtected && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Protected</span>
                )}
                {link.expiryDate && (
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Expiring</span>
                )}
              </div>
            </TableCell>
            {/* Display click count here */}
            <TableCell>{link.clickCount}</TableCell>
            <TableCell>{new Date(link.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link className={cn(buttonVariants({ variant: "ghost", size: "icon" }))} href={`/custom-links/${link.customId}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </Link>
                {
                  openDeleteModal  && <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => {
                    if (link.customId) {
                      openDeleteModal(link.customId);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                }
               
              </div>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
}

export default LinksTable