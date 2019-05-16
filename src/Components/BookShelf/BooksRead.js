import React from 'react';
import PropTypes from 'prop-types';

import BookItem from '../BookItem'

const BooksRead = props => {
    const {books, onMoveBookShelf} = props;

    return (
        <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                      {books.map((book, key) => (
                          <BookItem key={key} book={book} onMoveBookShelf={onMoveBookShelf}/>
                      ))}
                  </ol>
                </div>
              </div>
    )
}

BooksRead.propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBookShelf: PropTypes.func.isRequired
}

export default BooksRead;