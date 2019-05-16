import React from 'react'
import { Route } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';

import './App.css'

// API
import * as BooksAPI from './BooksAPI'

// Components
import Search from "./Components/Search";
import Shelf from './Components/BookShelf/Shelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false
  }

  setLoading = (isLoading) => {
    this.setState(() => ({
      loading: isLoading
    }))
  }

  componentDidMount() {
    this.updateBookShelf();
  }

  addBook = (book) => {
    this.setState((currentState => ({
      books: currentState.books.concat([book])
    })))
  }

  removeBook = (book) => {
    this.setState((currentState) => ({
      books: currentState.books.filter((b) => {
        return b.id !== book.id
      })
    }))
  }

  moveBookToShelf = (book, shelf) => {
    book.shelf = shelf;
    this.removeBook(book)
    this.addBook(book)
    BooksAPI.update(book, shelf);
  }

  updateBookShelf() {
    this.setLoading(true);
    BooksAPI.getAll()
      .then((books) => {
        this.setLoading(false);
        this.setState(() => ({
          books
        }));
      });
  }

  render() {
    const {loading, books} = this.state

    return (
      <LoadingOverlay
        active={loading}
        spinner
        text='Searching...'>
          <div className="app">
            <Route exact path="/" render={() => (
              <Shelf books={books} onMoveBookShelf={this.moveBookToShelf}/>
            )} />

            <Route path="/search" render={() => (
              <Search books={books} onMoveBookShelf={this.moveBookToShelf} />
            )} />
          </div>
      </LoadingOverlay>
    )
  }
}

export default BooksApp
