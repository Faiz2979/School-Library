    'use client'

    import { BarChart, Book, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

    export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: BarChart },
        { href: '/admin/book', label: 'Books', icon: Book },
        { href: '/admin/users', label: 'Users', icon: Users },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white shadow-md h-[calc(100vh-64px)]">
        <nav className="p-4">
            <ul className="space-y-2">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                <li key={item.href}>
                    <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    </Link>
                </li>
                );
            })}
            </ul>
        </nav>
        </aside>
    );
    }

