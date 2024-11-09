import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

function LinkInfoLoader() {
    return (
        <Card className="md:col-span-2 ">
            <CardHeader className="flex flex-row items-center justify-between">
              
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-xl shadow-sm border border-primary/20">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/6"></div>
                    </div>
                    <div className="p-6 bg-muted rounded-xl shadow-sm">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                    <div className="p-6 bg-muted rounded-xl shadow-sm">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                    <div className="p-6 bg-muted rounded-xl shadow-sm">
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LinkInfoLoader