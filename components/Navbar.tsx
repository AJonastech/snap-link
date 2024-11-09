"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navigationLinks = [
    {
        title: "Home",
        src: "/"
    },
    {
        title: "Product",
        src: "/product"
    },
    {
        title: "Pricing",
        src: "/pricing"
    },
    {
        title: "Resources",
        src: "/resource"
    }
]
function Navbar() {
    const pathname = usePathname()

    return (
        <header className='w-full h-[10vh] border-b-[2px] border-cultured'>
            <div className='container mx-auto flex justify-between items-center h-full'>
                <div className='flex items-center space-x-4'>
                    <h1 className='text-xl font-bold'>SNAPLINK</h1>
                </div>
                <nav className='flex grow items-center justify-center  space-x-4'>
                    {
                        navigationLinks.map((link, index) => (<Link key={index} href={link.src} className={`text-lg ${pathname === link.src && "bg-floral-white text-primary "} hover:bg-floral-white hover:text-primary transition-all duration-200 ease-in-out font-medium px-4 rounded-lg py-2 text-arsenic`}>{link.title}</Link>))
                    }


                </nav>
                <div className='flex items-center  space-x-4'>
                    <Link href='/login' className='text-lg rounded-lg  border-[2px] border-primary font-medium px-6 py-2 text-primary'>Login</Link>
                    <Link href='#' className='text-lg font-medium px-4 py-2 text-floral-white bg-primary rounded-lg'>Get a Quote</Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar