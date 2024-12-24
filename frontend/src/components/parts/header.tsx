'use client';

import Login from '@/components/forms/login';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setIsAdmin(false);
                return;
            }

            // Decode token payload (basic example, or you can validate through backend)
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setIsAuthenticated(true);
                setIsAdmin(payload.role === 'admin');
            } catch (error) {
                console.error('Invalid token:', error);
                setIsAuthenticated(false);
                setIsAdmin(false);
                localStorage.removeItem('token');
            }
        };

        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            // Optionally call an API endpoint for logout if needed
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setIsAdmin(false);
            router.push('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleLoginSuccess = (role: string, token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
        setShowLoginForm(false);
    };

    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-lg font-bold cursor-pointer" onClick={() => router.push('/')}>
                    My App
                </h1>
                <nav>
                    {isAuthenticated ? (
                        <>
                            {isAdmin && (
                                <button
                                    onClick={() => router.push('/admin')}
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
