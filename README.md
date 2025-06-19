# Book Explorer

A responsive web application that allows users to search for books using the Open Library API and view book details including title, author, cover image, and publication year.

##  Features

-  Search books by title or keyword
-  View book details (title, author, cover, publication year)
-  Fully responsive design
-  Loading states during API calls
-  Error handling for failed requests
-  Bonus features:
  - Detailed book view page
  - Empty search prevention
  - Cover image fallbacks

##  Tech Stack

- React.jsx
- Axios (for API calls)
- TailwindCSS (for styling)
- React Router (for navigation)
- Open Library API (free books database)
- Vercel (for deployment)
- react-icons (for Search icon)

##  Challenges and Lesson Learnt

- Missing Book Covers
  Some books had no cover images. I was able to fix this by:
  - Using conditional rendering
  - Adding placeholder UI
    Lesson Learnt: Always handle missing API data
- Mobile Layout Issues
  I started the cards layout with large screen and styling in small screen became difficult. i was able to fix this by:
  -  implementing responsive grid
  -  testing it on multiple devices
    Lesson Learnt: Mobile-first design is very important. Always start project on mobile screen before large screen


