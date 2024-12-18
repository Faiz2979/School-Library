'use client'

import Header from "@/components/header";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminLocked from "./components/admin-locked";
import AdminSidebar from "./components/admin-sidebar";

    export default function AdminLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:7070/auth', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (response.ok) {
            setIsAuthenticated(true);
            } else {
            setIsAuthenticated(false);
            localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        } finally {
            setIsLoading(false);
        }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLocked />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6">
            {children}
            </main>
        </div>
        </div>
    );
    }

