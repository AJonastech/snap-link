"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';


function OriginalUrlSnapShot({
    originalUrl
}: {
    originalUrl: string;
}) {
    const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchScreenshot = async () => {
            const response = await fetch("/api/screenshot", {
                method: "POST",
                body: JSON.stringify({ url: originalUrl }),
            });

            if (response.ok) {
                const encoded = Buffer.from(await response.arrayBuffer()).toString(
                    "base64"
                );
                setScreenshotUrl(`data:image/jpeg;base64,${encoded}`);
            }
        };

        fetchScreenshot();
    }, [originalUrl])





    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Original URL Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
                        {screenshotUrl ? (
                            <img src={screenshotUrl} alt="Website snapshot" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 animate-pulse">
                                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Original URL</p>
                        <div className="flex items-center gap-2">
                            <a
                                href={originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 transition-colors truncate max-w-[90%] text-sm font-medium"
                                title={originalUrl}
                            >
                                {originalUrl}
                            </a>
                            <svg 
                                className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </div>
                    </div>
                </>
            </CardContent>
        </Card>
    );
}

export default OriginalUrlSnapShot;
