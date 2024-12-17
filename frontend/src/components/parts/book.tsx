

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
        <div className="book relative group">
            <div className="cover">
                <img src={`${backendURL}/cover/${cover}`} className="w-40 h-60 object-cover" alt={title} />
            </div>
            <div className="info mt-2">
                <h1 className="text-lg font-bold">{title}</h1>
                <p className="text-sm text-gray-600">{author}</p>
                <div className="details absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p>ISBN: {isbn}</p>
                    <p>Publisher: {publisher}</p>
                    <p>Category: {category}</p>
                    <p>Stock: {stock}</p>
                </div>
            </div>
        </div>
    );
}