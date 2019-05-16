import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import BooksRead from './BooksRead';
import BooksWantToRead from './BooksWantToRead';
import BooksCurrentlyReading from './BooksCurrentlyReading';

const Shelf = (props) => {
  const {books, onMoveBookShelf} = props;
  const booksReadingCurrently = books.filter(b => b.shelf === 'currentlyReading');
  const booksWantToRead = books.filter(b => b.shelf === 'wantToRead');
  const booksRead = books.filter(b => b.shelf === 'read');

  return (
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BooksCurrentlyReading books={booksReadingCurrently} onMoveBookShelf={onMoveBookShelf}/>
              <BooksWantToRead books={booksWantToRead} onMoveBookShelf={onMoveBookShelf}/>
              <BooksRead books={booksRead} onMoveBookShelf={onMoveBookShelf}/>
            </div>
          </div>
          <div className="open-search">
              <Link
                to='/search'
                className="add-book">
                  Add a book
              </Link>
          </div>
        </div>
  );
}

Shelf.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveBookShelf: PropTypes.func.isRequired
}

export default Shelf