import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';

import BookItem from './BookItem';

import * as BooksAPI from '../BooksAPI';

class Search extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveBookShelf: PropTypes.func.isRequired
    }

    state = {
        booksFound: [],
        search: '',
        isLoading: false
    }

    clearBooks = _ => {
        setTimeout(() => {
            this.setState(() => ({
                booksFound: []
            }))
        }, 600);
    }

    updateSearch = (search) => {
        this.setState(() => ({
            search: search
        }));
        this.enableLoading(true);
        this.locateBook(search);
    }

    enableLoading = (enabled) => {
        this.setState(() => ({
            isLoading: enabled
        }))
    }

    locateBook = (search) => {
        if (search.trim() === "") {
            this.clearBooks();
            return
        }
        
        BooksAPI.search(search.toLowerCase())
            .then((books) => {
                if (books.error === undefined){
                    books = this.checkBookOnShelf(books);
                    this.setState(() => ({
                        booksFound: books
                    }));
                } else {
                    this.clearBooks();
                }

                this.enableLoading(false);
            });
    }

    checkBookOnShelf = booksFound => {
        const {books} = this.props;
        const newBooks = booksFound.map((b) => {
            for (let i = 0; i < books.length; i++){
                if (books[i].id === b.id) {
                    b.shelf = books[i].shelf;
                } else {
                    b.shelf = "none";
                }
            }
            return b;
        });
        return newBooks;
    }

    render() {
        const {booksFound, search, isLoading} = this.state;
        const {onMoveBookShelf} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                    to="/"
                    className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Search by title or author"
                      value={search}
                      onChange={(ev) => this.updateSearch(ev.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <LoadingOverlay
                      active={isLoading}
                      spinner
                      classNamePrefix="_search_loading_"
                      text='Searching...'>
                        <ol className="books-grid">
                            {booksFound.map((book, key) => (
                                <BookItem 
                                key={key} 
                                book={book} 
                                onMoveBookShelf={onMoveBookShelf}
                                highlight={search}
                                />
                            ))}
                        </ol>
                    </LoadingOverlay>
                </div>
            </div>
        )
    }
}

export default Search