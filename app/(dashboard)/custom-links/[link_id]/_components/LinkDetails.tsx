'use client'
import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from 'qrcode.react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ClickTable from '@/components/ClickTable';
import LinkInformationCard from '@/components/LinkInformationCard';
import { trpc } from '@/trpc/client';
import { useParams } from 'next/navigation';
import LinkInfoLoader from '@/components/LinkInfoLoader';
import ClickTableSkeleton from '@/components/ClickTableSkeleton';
import OriginalUrlSnapShot from '@/components/OriginalUrlSnapShot';
import { Input } from '@/components/ui/input';
import LinkSettings from '@/components/LinkSettings';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);





const LinkDetails = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
    const [isEditing, setIsEditing] = useState(false);
    const param = useParams();
    const customId = Array.isArray(param.link_id) ? param.link_id[0] : param.link_id;
    const [page, setPage] = useState(1)
    const limit = 5
    const { data: linkDetails, isLoading, isError } = trpc.links.fetchLinkDetail.useQuery({
        customId
    })
    const { data: clickDetails, isLoading: isClickLoading, isError: isClickError } = trpc.clicks.fetchLinkClicks.useQuery({
        customId,
        page,
        limit
    })

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle link editing
        setIsEditing(false);
    };

    const handleDownloadQR = () => {
        const svg = document.getElementById('qr-code');
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.drawImage(img, 0, 0);
            }
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "qr-code";
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };



    // Process clickDetails data into chartData format
    const chartData = useMemo(() => {
        if (!clickDetails) return { labels: [], datasets: [] };

        // Get the last 7 days
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d;
        }).reverse();

        // Format dates and create initial clicksByDate object
        const clicksByDate = last7Days.reduce((acc, date) => {
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            acc[dateStr] = 0;
            return acc;
        }, {} as Record<string, number>);

        // Aggregate clicks by date
        clickDetails.data.forEach(click => {
            const clickDate = new Date(click.date);
            if (clickDate >= last7Days[0] && clickDate <= today) {
                const dateStr = clickDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                clicksByDate[dateStr] = (clicksByDate[dateStr] || 0) + 1;
            }
        });

        // Create chart labels and data
        const labels = Object.keys(clicksByDate);
        const data = labels.map(date => clicksByDate[date]);

        return {
            labels,
            datasets: [
                {
                    label: 'Clicks',
                    data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };
    }, [clickDetails]);




    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Click Performance',
            },
        },
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: 'smooth' }) // Optional: scroll to top on page change
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center border-b border-muted/30 mb-8 gap-2 px-1 backdrop-blur-sm bg-background/60 rounded-lg shadow-sm">
                <div
                    className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer
            ${activeTab === 'overview'
                            ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-primary/60 after:to-primary after:rounded-full after:transition-all after:duration-300"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                        }
            `}
                    onClick={() => { setActiveTab('overview') }}
                >
                    Overview
                </div>
                <div
                    className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer
            ${activeTab === 'settings'
                            ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-primary/60 after:to-primary after:rounded-full after:transition-all after:duration-300"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                        }
            `}
                    onClick={() => { setActiveTab('settings') }}
                >
                    Settings
                </div>
            </div>

            {
                activeTab === 'overview' ? (<> <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {isLoading ? (
                        <LinkInfoLoader />
                    ) : linkDetails ? (
                        <LinkInformationCard
                            handleEdit={handleEdit}
                            linkData={{
                                ...linkDetails.data,
                                createdAt: new Date(linkDetails.data.createdAt),
                                expiryDate: linkDetails.data.expiryDate ? new Date(linkDetails.data.expiryDate) : null
                            }}
                        />
                    ) : null}
                    <Card>
                        <CardHeader>
                            <CardTitle>QR Code</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <QRCodeSVG id="qr-code" value={``} size={200} />
                            <Button onClick={handleDownloadQR} className="mt-4">Download QR Code</Button>
                        </CardContent>
                    </Card>
                </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {isClickLoading ? (
                            <ClickTableSkeleton />
                        ) : (
                            <ClickTable page={page} handlePageChange={handlePageChange} pagination={clickDetails?.pagination || { currentPage: 1, totalPages: 1, totalClicks: 0, hasNextPage: false, hasPreviousPage: false }} clickData={clickDetails?.data?.map(click => ({
                                ...click,
                                date: new Date(click.date)
                            })) || []} />
                        )}
                        {linkDetails?.data.originalUrl ? <OriginalUrlSnapShot originalUrl={linkDetails?.data.originalUrl} /> :

                            <Card>
                                <CardHeader>
                                    <CardTitle>Original URL Preview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
                                        <div className="w-full h-full bg-gray-200 animate-pulse">
                                            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg">
                                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        }
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Analytics Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg mb-2">Total Clicks: {clickDetails?.data.length}</p>
                                <div className="h-64">
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                            </CardContent>
                        </Card>
                    </div></>) :
           <>
             {
            linkDetails?.data ? <LinkSettings linkDetails={ {
                ...linkDetails.data,
                createdAt: new Date(linkDetails.data.createdAt),
                expiryDate: linkDetails.data.expiryDate ? new Date(linkDetails.data.expiryDate) : null
              } } /> : null
           }
           </>       
         
           

            }

        </div>
    );
};

export default LinkDetails;