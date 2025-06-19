

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetails from './BookDetails';
import BookSearch from './BookSearch';
import book from './assets/images/book.png'

function App() {
  return (
    
    <Router>
      <div className="container mx-auto px-4 py-8 ">
         <header className="text-center mb-8">
          <div className='flex justify-center gap-4'>
            <img className='w-20 h-20' src={book} alt="books" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 mt-4">
            Mini Book Explorer
          </h1>
          </div>
         
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock a Universe of Books, Explore Boundless Stories, and Discover Your Next Great Read in a World of Knowledge.
          </p>
        </header>
       
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<BookSearch />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;