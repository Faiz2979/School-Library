    'use client'

    import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

    interface BookPopupProps {
    book: {
        title: string;
        isbn: string;
        author: string;
        publisher: string;
        category: string;
        stock: number;
        cover: string;
    };
    onClose: () => void;
    }

    function BookPopup({ book, onClose }: BookPopupProps) {
    const backendURL = "http://localhost:7070";

    return (
        <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#2a1886] rounded-lg p-6 w-full max-w-2xl text-white shadow-xl"
            >
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                <Image
                    src={`${backendURL}/cover/${book.cover}`}
                    alt={book.title}
                    width={200}
                    height={300}
                    className="rounded-md object-cover w-full h-auto"
                />
                </div>
                <div className="md:w-2/3 md:pl-6">
                <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                <p className="text-lg mb-2">by {book.author}</p>
                <p className="mb-2">Publisher: {book.publisher}</p>
                <p className="mb-2">ISBN: {book.isbn}</p>
                <p className="mb-2">Category: {book.category}</p>
                <p className="mb-4">Stock: {book.stock}</p>
                <button
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
                </div>
            </div>
            </motion.div>
        </motion.div>
        </AnimatePresence>
    );
    }

    export { BookPopup };

