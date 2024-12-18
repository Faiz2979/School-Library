'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Login from './forms/login';

export default function Header() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setIsAdmin(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:7070/auth', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                    localStorage.removeItem('token');
                } else {
                    const { role } = await response.json();
                    setIsAuthenticated(true);
                    setIsAdmin(role === 'admin');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
                setIsAdmin(false);
                localStorage.removeItem('token');
            }
        };

        verifyToken();
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const response = await fetch('http://localhost:7070/authorize', {
                method: 'POST',
            });
            if (response.ok) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setIsAdmin(false);
                router.push('/admin/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLoginSuccess = (role: string) => {
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
        setShowLoginForm(false);
    };

    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-lg font-bold">My App</h1>
                <nav>
                    {isAuthenticated ? (
                        <>
                            {isAdmin && (
                                <button
                                    onClick={() => router.push('/admin/dashboard')}
                                    className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 mr-2"
                                >
                                    Admin Dashboard
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
                            >
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowLoginForm(true)}
                            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                    )}
                </nav>
            </header>
            {showLoginForm && (
                <Login
                    onClose={() => setShowLoginForm(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
}
