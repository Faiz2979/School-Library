'use client';

import AdminSidebar from "@/app/admin/components/admin-sidebar";
import { useAuth } from "@/app/admin/components/authContext";
import Header from "@/components/parts/header";
import { useEffect, useState } from "react";
import AdminLocked from "./components/admin-locked";

    export default function AdminLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    const { token, isAuthenticated, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:7070/auth/login", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (!response.ok) {
            logout(); // Jika token tidak valid, logout pengguna
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
        };

        checkAuth();
    }, [token, logout]);

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
        return (
        <div>
        <Header />
        <AdminLocked />
        </div>
    );
}

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
    }
