
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
        <div className="flex-shrink-1 w-auto rounded-lg hover:outline outline-[#2103b4] outline-offset-2 transition-all duration-100 ease-in-out outline-2">
            <div className="relative group">
                <Image
                    className="rounded-lg"
                    src={`${backendURL}/cover/${cover}`}
                    alt={title}
                    width={400}
                    height={600}
                    />
                <h2 className="absolute text-white text-md oxanium oxanium-semibold truncate w-full">
                    {title};
                </h2>
                <div className="bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
                    <h3 className="absolute bottom-4 left-4 text-gray-400 text-md oxanium oxanium-semibold">
                        {author}
                    </h3>
                </div>
            </div>
        </div>
    );
}