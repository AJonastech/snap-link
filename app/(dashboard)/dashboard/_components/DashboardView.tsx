"use client"
import {  useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
import qrcode from "@/app/images/qr_code.png";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { motion } from "framer-motion";
import { ArrowRightIcon, BarChart3, DownloadIcon, Link2  } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/trpc/client";
import { Table,TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LinksTableLoader from "@/components/LinksTableLoader";
import LinksTable from "@/components/LinksTable";
import { SubscribeModal } from "@/components/Subscribe";
import Link from "next/link";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function DashboardView() {

const links = trpc.links.fetchTopLinks.useQuery()
const { data,  error } = trpc.user.getUserSubscription.useQuery();
const [open , setOpen]= useState(false)

useEffect(()=>{
if(data&& !data?.isPremium){
setOpen(true)
}
},[data])
console.log(error)

// const onOpen = ()=>{

// }
    const [chartType, setChartType] = useState("bar");

    const { isLoaded, isSignedIn } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }



    // const primaryColor = "hsl(220, 100%, 54%)"; // Theme color in HSL
    // const primaryColorAlpha = "hsla(220, 100%, 54%, 0.5)";

    const lineChartData = links.data?.lineChartData || { labels: [], datasets: [] };
const barChartData = links.data?.barChartData || { labels: [], datasets: [] };
const pieChartData = links?.data?.pieChartData || { labels: [], datasets: [] };


    return (
        <div className="px-4 py-6 sm:px-0 flex">
            {/* Main content */}
            <div className="flex-grow mr-6">
                {/* Stats Cards */}
             
                {/* Loading State for Stats Cards */}
                {links.isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Total Clicks</h3>
                                <div className="bg-primary p-2 rounded-full flex items-center justify-center">
                                    <BarChart3 className="text-white" size={24} />
                                </div>
                            </div>
                            <p className="text-4xl font-bold text-primary">{links?.data?.totalClickCount}</p>
                            <p className="text-sm text-gray-500 mt-2">+5% from last week</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Created Links</h3>
                                <div className="bg-primary p-2 rounded-full flex items-center justify-center">
                                    <Link2 className="text-white" size={24} />
                                </div>
                            </div>
                            <p className="text-4xl font-bold text-primary">{links?.data?.totalLinkCount}</p>
                            <p className="text-sm text-gray-500 mt-2">+3 new links today</p>
                        </motion.div>
                    </div>
                )}

                {/* Charts */}
               
                {/* Loading Skeleton for Charts */}
                {!links.isLoading ? <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-sm mb-8"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>
                        <div className="flex items-center space-x-2">
                            <Select
                                onValueChange={(value) => setChartType(value)}
                                defaultValue="bar"
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select chart type" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="bar">Bar Chart</SelectItem>
                                    <SelectItem value="line">Line Chart</SelectItem>      
                                    <SelectItem value="pie">Pie Chart</SelectItem>
                                </SelectContent>
                            </Select>
                            
                        </div>
                    </div>
                    <div className="h-[280px]"> {/* Adjust this value to reduce the height */}
                        {chartType === 'line' && (
                            <Line
                                data={lineChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: 'Click Analytics',
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        )}
                        {chartType === 'bar' && (
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: 'Click Analytics',
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        )}
                        {chartType === 'pie' && (
                            <Pie
                                data={pieChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top' as const,
                                        },
                                        title: {
                                            display: true,
                                            text: 'Click Analytics',
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                </motion.div>: (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-white p-6 rounded-xl shadow-sm mb-8"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                            <div className="h-10 bg-gray-200 rounded w-[180px]"></div>
                        </div>
                        <div className="h-[280px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </motion.div>
                )}
                {/* Top Performing Links Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-sm"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Links</h2>
                    <div className="overflow-x-auto">
                    <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Custom Link</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Clicks</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  links.isLoading ? <LinksTableLoader/> : 
             
                  <LinksTable
                  linkData={links.data?.links.map(link => ({
                    ...link,
                    expiryDate: link.expiryDate ? new Date(link.expiryDate) : null,
                    createdAt: new Date(link.createdAt)
                  })) || []}
                />
                }
               
              </TableBody>
            </Table>
                    {links.data?.links.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-full p-6 mb-6">
                                <Link2 className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No links created yet
                            </h3>
                            <p className="text-gray-500 text-center mb-6 max-w-md">
                                Create your first custom link to start tracking clicks and measuring performance
                            </p>
                            <Link 
                                href="/custom-links"
                                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Link2 className="mr-2 h-4 w-4" />
                                Create your first link
                            </Link>
                        </div>
                    )}
                    </div>
                </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 flex-shrink-0">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-sm mb-6"
                >
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        CREATE NEW LINK 🔗
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Create, shorten, and manage your links</p>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your link here"
                            className="w-full py-3 px-4 pr-24 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            className="absolute inline-flex items-center right-2 px-4 py-2 font-medium top-1/2 -translate-y-1/2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors group"
                        >
                            Short <ArrowRightIcon className='ml-2 transition-transform group-hover:translate-x-1' />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white p-6 rounded-xl shadow-sm"
                >
                    <h3 className="text-base font-semibold text-gray-700 mb-4">QR CODE</h3>
                    <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mb-4">
                        {/* Placeholder for QR code image */}
                        <Image src={qrcode} alt="QR Code" width={200} height={200} />

                    </div>
                    <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
                        <DownloadIcon className="mr-2" size={20} />
                        Download PNG
                    </button>
                </motion.div>
            </div>
            <SubscribeModal
            isOpen={open}
            onClose={setOpen}
            />
        </div>
    );
}

export default DashboardView;