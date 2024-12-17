import Book from '@/components/parts/book';
import { useState } from 'react';

export default function Bookshelf() {

    const [books, setBooks] = useState([]);
    
    const getBooks = async () => {
        const response = await fetch('http://localhost:3000/book/');
        const data = await response.json();
        console.log(data);
    }
    return (
        <div>
            <h1>Bookshelf</h1>
            
            <Book></Book>
        </div>
    );
}