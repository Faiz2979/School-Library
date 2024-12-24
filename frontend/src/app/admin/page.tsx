'use client';
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const [bookCount, setBookCount] = useState(0);
    const [borrowedBooks, setBorrowedBooks] = useState(0);
    const [overdueReturns, setOverdueReturns] = useState(0);

    const fetchBookCount = async () => {
      try {
          const response = await fetch('http://localhost:7070/book/', {
              method: 'GET',
          });
          if (!response.ok) {
              console.error('Failed to fetch book count:', response.statusText);
              return;
          }
  
          const data = await response.json();
          console.log('Book count response:', data);
  
          // Menghitung total stock dari semua buku
          const totalStock = data.data.reduce((total: number, book: { stock: number }) => total + book.stock, 0);
          
          setBookCount(totalStock); // Set nilai total stock ke state
      } catch (error) {
          console.error('Error fetching book count:', error);
      }
  };
  
    const fetchBorrowedBooks = async () => {
      try{
        const response = await fetch('http://localhost:7070/borrow/total', {
          method: 'GET',
        });
        if(!response.ok){
          console.error('Failed to fetch borrowed books:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log('Borrowed books response:', data.total_borrowed_books);
        setBorrowedBooks(data.total_borrowed_books);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    }
    useEffect(() => {
        fetchBookCount();
        fetchBorrowedBooks();
    }, []);

    return (
        <div className="space-y-6 text-[#08002e]">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Books</h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {bookCount}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Borrowed Books</h3>
                    <p className="text-3xl font-bold text-orange-600">
                      {borrowedBooks}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Overdue Returns</h3>
                    <p className="text-3xl font-bold text-red-600">5</p>
                </div>
            </div>
        </div>
    );
}
