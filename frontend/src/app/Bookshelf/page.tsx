import Book from '@/components/parts/book';
import { useState } from 'react';

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
        const response = await fetch('http://localhost:3000/book/');
        const data = await response.json();
        console.log(data);
    }
    return (
        <div>
            <h1>Bookshelf</h1>
            <div id='bookshelf-items'>
            {books.map((book) => (
                <Book
                    key={book.isbn}
                    title={book.title}
                    isbn={book.isbn}
                    author={book.author}
                    publisher={book.publisher}
                    category={book.category}
                    stock={book.stock}
                    cover={book.cover}
                />))}
            </div>
        </div>
    );
}