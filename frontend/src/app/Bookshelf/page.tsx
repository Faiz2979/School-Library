'use client';
import Book from '@/components/parts/book';
import { useEffect, useState } from 'react';

export default function Bookshelf() {
    interface Book {
        isbn: string;
        title: string;
        author: string;
        publisher: string;
        category: string;
        stock: number;
        cover: string;
    }

    const [books, setBooks] = useState<Book[]>([]);

    const getBooks = async () => {
        try {
            const response = await fetch('http://localhost:7070/book/', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); // Full response including `success` and `data`
            if (result.success && Array.isArray(result.data)) {
                setBooks(result.data); // Use the `data` field containing the books
            } else {
                console.error('Unexpected data format:', result);
                setBooks([]);
            }
        } catch (error) {
            console.error('Failed to fetch books:', error);
            setBooks([]);
        }
    };
    
    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div>
            <h1>Bookshelf</h1>
            <div id='bookshelf-items'>
                {books.length > 0 ? (
                    books.map((book) => (
                        <Book
                            key={book.isbn}
                            title={book.title}
                            isbn={book.isbn}
                            author={book.author}
                            publisher={book.publisher}
                            category={book.category}
                            stock={book.stock}
                            cover={book.cover}
                        />
                    ))
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    );
}
