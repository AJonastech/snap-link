"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Badge } from './ui/badge'
import { Copy, CheckIcon, Settings } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link as LinkType } from '@prisma/client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import EditDialog from './EditDialog'




interface LinkInformationCardProps {
    linkData: Omit<LinkType, 'password'>;
    handleEdit: (event: React.FormEvent<HTMLFormElement>) => void;
}
function LinkInformationCard({ linkData, handleEdit }: LinkInformationCardProps) {

    const [isCopied, setIsCopied] = useState(false)


    const getShareableUrl = () => {
        const baseUrl = process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_APP_BASE_URL
            : 'http://localhost:3000';
        return `${baseUrl}/${linkData.customId}`;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getShareableUrl())
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }


    return (
        <Card className='md:col-span-2'>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className=" ">Link Information</CardTitle>
            </CardHeader>
            <CardContent>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-xl shadow-sm border border-primary/20">
                        <h3 className="text-sm font-medium mb-2 text-primary">Shareable Link</h3>
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-mono bg-background/80 dark:bg-background/60 text-foreground dark:text-foreground px-3 py-1 rounded-md flex-1 truncate border border-primary/20">
                                {getShareableUrl()}
                            </p>
                            <Button
                                onClick={copyToClipboard}
                                variant="outline"
                                size="sm"
                                className="hover:bg-primary/10 dark:hover:bg-primary/20 border-primary/20"
                            >
                                {isCopied ? <CheckIcon className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-primary" />}
                            </Button>
                        </div>
                    </div>
                    <div className="p-6 bg-muted rounded-xl shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Custom ID</h3>
                        <p className="text-sm font-medium">{linkData.customId || 'Not set'}</p>
                    </div>
                    <div className="p-6 bg-muted rounded-xl shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Expiry Date</h3>
                        <p className="text-sm font-medium">
                            {linkData.expiryDate
                                ? new Date(linkData.expiryDate).toLocaleDateString()
                                : 'No expiry date'}
                        </p>
                    </div>
                    <div className="p-6 bg-muted rounded-xl shadow-sm">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Password Protection</h3>
                        <p className="text-sm font-medium">
                            {linkData.isPasswordProtected ? 'Protected' : 'Not protected'}
                        </p>
                    </div>
                </div>

                <AnimatePresence>
                    {isCopied && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-4 right-4"
                        >
                            <Badge variant="default">Copied to clipboard!</Badge>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    )

}

export default LinkInformationCard
