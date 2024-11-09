import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

import React from 'react'

function layout({ children }: {
    children: React.ReactNode
}) {
    return (

        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
                <Header />

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    
    )
}

export default layout