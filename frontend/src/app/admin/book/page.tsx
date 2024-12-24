'use client';
import { useState } from 'react';
export default function AdminBook() {
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

    return (
        <div>
            tes
        </div>
    );
}