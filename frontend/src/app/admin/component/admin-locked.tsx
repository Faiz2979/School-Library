    import Header from "@/components/header";

    export default function AdminLocked() {
    return (
        <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="mb-4 text-red-500">
                <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
                You need to be logged in as an administrator to access this area.
            </p>
            <button
                onClick={() => window.location.href = '/'}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Return to Homepage
            </button>
            </div>
        </div>
        </div>
    );
    }

