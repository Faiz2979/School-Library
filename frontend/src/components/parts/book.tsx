
import Image from 'next/image';
interface bookProps {
    title: string;
    isbn: string;
    author: string;
    publisher: string;
    category: string;
    stock: number;
    cover: string;
}

export default function Book({ title, isbn, author, publisher, category, stock, cover }: bookProps) {
    const backendURL = "http://localhost:7070";
    
    return (
        <div className="flex-shrink-0 w-64">
                    <div className="relative group">
                    <Image
                        className="rounded-lg"
                        src={`${backendURL}/cover/${cover}`}
                        alt={title}
                        width={500}
                        height={600}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
                        <h2 className="absolute bottom-4 left-4 text-white text-lg oxanium oxanium-semibold">
                        {title}
                        </h2>
                        <h3 className="absolute bottom-4 left-4 text-white text-lg oxanium oxanium-semibold">
                        {author}
                        </h3>
                    </div>
                    </div>
                </div>
    );
}