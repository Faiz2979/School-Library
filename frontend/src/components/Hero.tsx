'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#08002e] overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="oxanium flex flex-col items-center justify-center h-full z-10 px-4 text-center"
            >
                <motion.div 
                    className='text-white text-6xl lg:text-8xl oxanium oxanium-semibold leading-none inline-flex items-end gap-[2px] mb-4'
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    School<span className="text-blue-600">Library</span>
                </motion.div>
                <motion.h1 
                    className="text-lg md:text-4xl oxanium-bold text-white mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    This is School <span className='text-blue-600'>Library</span> Web
                </motion.h1>
                <motion.p 
                    className="text-white oxanium-regular mt-2 mb-6 max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    Discover a world of knowledge at your fingertips. Explore our vast collection of books and resources.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Link 
                        className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-300 inline-flex items-center group" 
                        href="/bookshelf"
                    >
                        Explore
                        <svg 
                            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

