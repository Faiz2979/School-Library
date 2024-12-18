    'use client'
    import { useEffect, useState } from "react";
import { LoginForm } from "./login";

    export default function Header() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [showLoginForm, setShowLoginForm] = useState(false);

        useEffect(() => {
            const verifyToken = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }

                try {
                    const response = await fetch("http://localhost:7070/api", {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (!response.ok) {
                        setIsAuthenticated(false);
                        localStorage.removeItem("token");
                    } else {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error("Error verifying token:", error);
                    setIsAuthenticated(false);
                    localStorage.removeItem("token");
                }
            };

            verifyToken();
        }, []);

        const handleLogout = () => {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        };

        const handleLoginSuccess = () => {
            setIsAuthenticated(true);
            setShowLoginForm(false);
        };

        return (
            <>
                <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                    <h1 className="text-lg font-bold">My App</h1>
                    <nav>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
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
                    <LoginForm
                        onClose={() => setShowLoginForm(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}
            </>
        );
    }
