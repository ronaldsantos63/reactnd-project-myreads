import React from 'react';
import PropTypes from 'prop-types';

import Highlight from './Highlight';

const BookItem = props => {
    const {book, onMoveBookShelf, highlight} = props;
    const thumbnaiDefault = 'https://books.google.com.br/googlebooks/images/no_cover_thumb.gif';

    const handleOnChange = (ev, book) =>{
        onMoveBookShelf(book, ev.target.value)
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div 
                        className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks !== undefined ? book.imageLinks.thumbnail : thumbnaiDefault })` }}></div>
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(ev) => handleOnChange(ev, book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">
                    <Highlight
                      text={book.title}
                      highlight={highlight}
                    />
                </div>
                <div className="book-authors">
                    {book.authors ? <Highlight text={book.authors.join(', ')} highlight={highlight}/> :''}
                </div>
            </div>
        </li>
    )
}

BookItem.propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBookShelf: PropTypes.func.isRequired,
    highlight: PropTypes.string
}

export default BookItem