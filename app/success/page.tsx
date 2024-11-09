'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SuccessPage() {
    const [windowSize, setWindowSize] = useState({
            width: 0,
            height: 0,
        });
    
        useEffect(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={200}
            />
            
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                    className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. We've sent you an email with all the details.
                </p>

                <Link href="/dashboard">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
                    >
                        Return to Homepage
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}