import {useEffect, useState} from 'react';
import {Book} from '../types/Book';
import {deleteBook, fetchBooks} from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, []);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum]);

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?'
        );
        if (!confirmDelete) return;

        try {
            await deleteBook(bookID);
            setBooks(books.filter((book) => book.bookID !== bookID));
        } catch (error) {
            alert('Failed to delete book: ' + error);
        }
    };

    if (loading) {
        return <p>Loading books...</p>;
    }
    if (error) {
        return <p>Error fetching books: {error}</p>;
    }

    return (
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button
                    className="btn btn-success mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Add Book
                </button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, []).then((data) =>
                            setBooks(data.books)
                        );
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageSize, pageNum, []).then((data) =>
                            setBooks(data.books)
                        );
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Classification</th>
                    <th>Category</th>
                    <th>Page Count</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.bookID}>
                        <td>{book.bookID}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.isbn}</td>
                        <td>{book.classification}</td>
                        <td>{book.category}</td>
                        <td>{book.pageCount}</td>
                        <td>{book.price}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm w-100 mb-1"
                                onClick={() => setEditingBook(book)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm w-100"
                                onClick={() => handleDelete(book.bookID)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;
