'use client';
import Book from '@/components/parts/book';
import Loader from '@/components/parts/loader';
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
        const [loading, setLoading] = useState<boolean>(true);
    
        async function getBooks() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:7070/book/', {
            method: 'GET',
            });
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
            setBooks(result.data);
            } else {
            console.error('Unexpected data format:', result);
            setBooks([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
        }
    
        useEffect(() => {
        getBooks();
        }, []);
    
        return (
        <div className="m-2">
            <h1>Bookshelf</h1>
            <div className="flex justify-center align-center flex-wrap">
            {loading ? (
                <Loader size={48} color="#3498db" />
            ) : books.length > 0 ? (
                books.map((book) => (
                <Book key={book.isbn} {...book}>

                </Book>
                ))
            ) : (
                <p>No books available.</p>
            )}
            </div>
        </div>
        );
    }
    