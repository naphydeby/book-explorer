import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,first_publish_year,cover_i&limit=10`
      );
      setBooks(response.data.docs);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (bookKey) => {
    navigate(`/book/${bookKey.replace('/works/', '')}`);
  };

  return (
    <div>
      <form onSubmit={searchBooks} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books by title, author, or keyword..."
            className="flex-grow p-4 bg-white border-0 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading && <div className="text-center py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" ></div>
        <span className='ml-4'>Searching books...</span>
        
        </div>}

      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {books.map((book) => (
            <div
              key={book.key}
              onClick={() => handleBookClick(book.key)}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden pb-4  "
            >
              <div className="relative  overflow-hidden" >
                {book.cover_i ? (
                
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="w-full h-96 object-cover mb-2 rounded transform transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-48 absolute bg-gray-200 flex items-center justify-center mb-2">
                  <span className="text-gray-500">No cover available</span>
                </div>
              )}
              </div>
             
              <h3 className="font-bold text-lg mb-1 line-clamp-2 ml-4">{book.title}</h3>
              <p className="text-gray-600 mb-1 ml-4">
                {book.author_name ? book.author_name.join(', ') : 'Unknown author'}
              </p>
              {book.first_publish_year && (
                <p className="text-sm text-gray-500 ml-4">Published: {book.first_publish_year}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && books.length === 0 && query && !error && (
        <div className="text-center py-8 text-gray-500">No books found. Try a different search.</div>
      )}
    </div>
  );
};

export default BookSearch;