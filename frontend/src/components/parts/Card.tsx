    'use client'

    import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { BookPopup } from './Popup';

    interface BookProps {
    title: string;
    isbn: string;
    author: string;
    publisher: string;
    category: string;
    stock: number;
    cover: string;
    }

    function BookCard(book: BookProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const backendURL = "http://localhost:7070";

    return (
        <>
        <motion.div 
            className="relative w-[200px] h-[300px] rounded-md overflow-hidden cursor-pointer"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            {/* Cover Image */}
            <Image
            src={`${backendURL}/cover/${book.cover}`}
            alt={book.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            />

            {/* Overlay on hover */}
            <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            >
            {/* Book details */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 p-4 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <h3 className="text-lg font-bold mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm mb-2 line-clamp-1">{book.author}</p>
                <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">{book.category}</span>
                <span className="text-xs">{book.stock} in stock</span>
                </div>
            </motion.div>
            </motion.div>

            {/* "Read More" button on hover */}
            <motion.button
            className="absolute top-2 right-2 bg-white text-black text-xs font-bold py-1 px-2 rounded opacity-0"
            whileHover={{ scale: 1.05 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowPopup(true)}
            >
            Read More
            </motion.button>
        </motion.div>

        {/* Book Popup */}
        {showPopup && (
            <BookPopup book={book} onClose={() => setShowPopup(false)} />
        )}
        </>
    );
    }

    export { BookCard };
