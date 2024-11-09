"use client"
import { Bell, ChevronDown, Settings } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useClerk, useUser } from '@clerk/nextjs'
function Header() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-gray-900">URL SHORTENER</h1>


                <div className="relative flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                            {user?.imageUrl ? (
                                <Image
                                    src={user.imageUrl}
                                    alt={user.firstName || "User"}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-primary font-medium">
                                    {user?.firstName?.[0]}
                                </span>
                            )}
                        </div>
                        <span className="text-gray-700">{user?.firstName}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {dropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md overflow-hidden shadow-lg z-10 border border-gray-200"
                        >
                            <div className="py-1">
                                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">Profile</a>
                                <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">Settings</a>
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                >
                                    Sign out
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header