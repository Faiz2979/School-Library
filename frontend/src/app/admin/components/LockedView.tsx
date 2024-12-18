    import Link from 'next/link';

    export default function LockedView() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold mb-4">Admin Area Locked</h1>
            <p className="mb-4">You need to be logged in to access this area.</p>
            <Link
            href="/admin/login"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
            Go to Login
            </Link>
        </div>
        </div>
    );
    }

