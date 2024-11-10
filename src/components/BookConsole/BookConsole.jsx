import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';

export const BookConsole = () => {

    const [books, setBooks] = useState([]);
    const [form, setForm] = useState({ title: '', author: '', pages: '', rating: '', comments: '', description: '' });
    const [editingBookId, setEditingBookId] = useState(null);
    const [lookupResults, setLookupResults] = useState([]);
    const [selectedLookupIndex, setSelectedLookupIndex] = useState(null);

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api' : 'https://api.sisooyin.com/api';
    const fetchBooks = () => {
        fetch(apiUrl + '/booklog/book/all')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBookId) {
            updateBook(editingBookId, form);
        } else {
            addBook(form);
        }
    };

    const addBook = (book) => {
        fetch(apiUrl + '/booklog/book/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
            .then(response => response.json())
            .then(() => {
                fetchBooks();
                setForm({ title: '', author: '', pages: '', rating: '', comments: '', description: '' });
            })
            .catch(error => console.error('Error adding book:', error));
    };

    const updateBook = (id, book) => {
        book.id = id;
        fetch(apiUrl + `/booklog/book/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
            .then(response => response.json())
            .then(() => {
                fetchBooks();
                setForm({ title: '', author: '', pages: '', rating: '', comments: '', description: '' });
                setEditingBookId(null);
            })
            .catch(error => console.error('Error updating book:', error));
    };

    const deleteBook = (id) => {
        fetch(apiUrl + `/booklog/book/delete/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchBooks())
            .catch(error => console.error('Error deleting book:', error));
    };

    const handleEdit = (book) => {
        setForm({ title: book.title, author: book.author, pages: book.pages, rating: book.rating, comments: book.comments, description: book.description });
        setEditingBookId(book.id);
    };

    const handleStarClick = (rating) => {
        setForm({ ...form, rating });
    };

    const handleLookup = () => {
        const { title, author } = form;
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&maxResults=3`)
            .then(response => response.json())
            .then(data => setLookupResults(data.items || []))
            .catch(error => console.error('Error fetching lookup results:', error));
    };

    const handleLookupItemClick = (result, index) => {
        const { title, authors, pageCount, description } = result.volumeInfo;
        setForm({ title, author: authors?.join(', '), pages: pageCount, rating: '', comments: '', description });
        setSelectedLookupIndex(index);
    };



    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="admin-console">
            <h2>Book Console</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={form.author}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="pages"
                    placeholder="Page Count"
                    value={form.pages}
                    onChange={handleInputChange}
                    required
                />
                <textarea
                    name="comments"
                    placeholder="Comments"
                    value={form.comments}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}

                    onChange={handleInputChange}
                />
                <div className="star-rating">
                    {[...Array(10)].map((_, index) => {
                        const ratingValue = (index + 1);
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => handleStarClick(ratingValue)}
                                />
                                <span
                                    className={`star ${ratingValue <= form.rating ? 'filled' : ''}`}
                                    style={{ fontSize: '24px', cursor: 'pointer' }}
                                >
                                    &#9733;
                                </span>
                            </label>
                        );
                    })}
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">{editingBookId ? 'Update' : 'Add'} Book</button>
                    <button
                        type="reset"
                        className={`btn ${form.title || form.author ? 'btn-warning' : 'btn-secondary'}`}
                        onClick={() => setForm({ title: '', author: '', pages: '', rating: '', comments: '', description: '' })}
                    >
                        Clear
                    </button>
                    <button type="button" className="btn btn-info" onClick={handleLookup}>Look Up</button>
                    {editingBookId && <button type="button" className="btn btn-warning" onClick={() => setEditingBookId(null)}>Cancel</button>}
                    {lookupResults.length > 0 && <button type="button" className="btn btn-danger" onClick={() => setLookupResults([])}>Close</button>}
                </div>
            </form>
            <div className="lookup-results">
                {lookupResults.map((result, index) => (
                    <div
                        key={index}
                        className={`lookup-item ${selectedLookupIndex === index ? 'selected' : ''}`}
                        onClick={() => handleLookupItemClick(result, index)}
                    >
                        <img src={result.volumeInfo.imageLinks?.thumbnail} alt={result.volumeInfo.title} />
                        <h3>{result.volumeInfo.title}</h3>
                        <p>{result.volumeInfo.authors?.join(', ')}</p>
                        <p>{result.volumeInfo.pageCount} pages</p>
                    </div>
                ))}
            </div>
            <div className="book-list">
                {books.map((book) => (
                    <div className="book-item" key={book.id}>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <p>Page Count: {book.pages}</p>
                        <p>Rating: {book.rating}</p>
                        <button className="btn btn-warning" onClick={() => handleEdit(book)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => deleteBook(book.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
};