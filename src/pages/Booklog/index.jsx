import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';

const Booklog = () => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    const currentEnv = import.meta.env.VITE_CURRENT_ENV;
    const apiUrl = currentEnv === 'LOCAL' ? 'http://127.0.0.1:5000/api/booklog/book/all' : 'https://api.sisooyin.com/api/booklog/book/all';

    useEffect(() => {
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCardClick = (index) => {
        setSelectedBook(index);
    };

    const handleCloseClick = (e) => {
        e.stopPropagation();
        setSelectedBook(null);
    };

    const handleBackdropClick = () => {
        setSelectedBook(null);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 10 - fullStars;
        const halfStar = rating % 1 !== 0;

        return (
            <div className="star-rating">
                {[...Array(fullStars)].map((_, index) => (
                    <span key={index} className="star filled">&#9733;</span>
                ))}
                {[...Array(emptyStars)].map((_, index) => (
                    <span key={index} className="star">&#9733;</span>
                ))}
                {halfStar && <span className="star filled">&#9734;</span>}
            </div>
        );
    };

    return (
        <div className="booklog-container">

            {books.map((book, index) => (
                <div
                    className={`book-card ${selectedBook === index ? 'selected' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(index)}
                >
                    <div className="book-face front" style={{ color: 'black' }}>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <h4>Comments</h4>
                        <p>{book.comments}</p>
                        <h4>Rating</h4>
                        {book.rating + ' out of 10'}
                        {renderStars(book.rating)}
                    </div>
                    <div className="book-face back" onClick={(e) => e.stopPropagation()}>
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                        <button onClick={handleCloseClick}>Close</button>
                    </div>
                </div>
            ))}

            {selectedBook !== null && <div className="backdrop" onClick={handleBackdropClick}></div>}
        </div>
    );
};

export default Booklog;