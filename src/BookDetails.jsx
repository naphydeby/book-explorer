import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [workResponse, editionsResponse] = await Promise.all([
          axios.get(`https://openlibrary.org/works/${id}.json`),
          axios.get(`https://openlibrary.org/works/${id}/editions.json?limit=1`)
        ]);
        
        const workData = workResponse.data;
        const editionsData = editionsResponse.data;
        
        //  Description either an object or string
        let description = '';
        if (workData.description) {
          description = typeof workData.description === 'string' 
            ? workData.description 
            : workData.description.value || '';
        }

        // when authors do not exist
        const authors = workData.authors 
          ? workData.authors.map(author => author.name || author.author?.key.replace('/authors/', ''))
          : [];

        // when editions have no covers
        let coverId = null;
        if (editionsData.entries && editionsData.entries[0]?.covers?.[0]) {
          coverId = editionsData.entries[0].covers[0];
        } else if (workData.covers?.[0]) {
          coverId = workData.covers[0];
        }

        const bookData = {
          title: workData.title || 'Untitled',
          description: description,
          authors: authors,
          firstPublished: workData.first_publish_date || 'Unknown',
          coverId: coverId,
          subjects: workData.subjects?.slice(0, 5) || []
        };
        
        setBook(bookData);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Failed to fetch book details. The book might not exist or there was a network error.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to search
        </button>
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:text-blue-800"
        >
          ← Back to search
        </button>
        <div className="text-center py-8 text-gray-500">Book details not available</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-sm hover:shadow-lg transition-all duration-300">
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to search
      </button>
      
      <div className="md:flex gap-6 ">
        {book.coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
            alt={book.title}
            className="w-full md:w-1/3 h-auto object-contain mb-4 md:mb-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover';
            }}
          />
        ) : (
          <div className="w-full md:w-1/3 h-64 bg-gray-200 flex items-center justify-center mb-4 md:mb-0">
            <span className="text-gray-500">No cover available</span>
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
          
          {book.authors.length > 0 && (
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Author(s):</span> {book.authors.join(', ')}
            </p>
          )}
          
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">First published:</span> {book.firstPublished}
          </p>
          
          {book.description && (
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Description:</h2>
              <p className="text-gray-700">
                {book.description.length > 500 
                  ? `${book.description.substring(0, 500)}...` 
                  : book.description}
              </p>
            </div>
          )}
          
          {book.subjects.length > 0 && (
            <div>
              <h2 className="font-semibold mb-1">Subjects:</h2>
              <div className="flex flex-wrap gap-2">
                {book.subjects.map((subject, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {typeof subject === 'string' ? subject : subject.name || 'Subject'}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;