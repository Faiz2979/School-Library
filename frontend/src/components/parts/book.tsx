

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
    return (
        <div className="book">
            <div className="cover">
                <img src={cover} alt={title} />
            </div>
            <div className="info">
                <h1>{title}</h1>
                <p>Author: {author}</p>
                <p>ISBN: {isbn}</p>
                <p>Publisher: {publisher}</p>
                <p>Category: {category}</p>
                <p>Stock: {stock}</p>
            </div>
        </div>
    );
}