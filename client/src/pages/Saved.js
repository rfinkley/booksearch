import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API"
import { FormBtnDelete ,FormBtnView, BookCard} from "../components/BookCard"

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <p>Search for and Save Books of Interest</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Container fluid>
              <h2>Saved Books</h2>
              {this.state.books.map( (book, index) => (
                <BookCard key={index} className="container my-4">
                  <div className="row">
                    <div className="col">
                      <h2>{book.title}</h2>
                      <p>Subtitle: {book.subtitle ? book.subtitle : "No Subtitle"}  </p>
                      <p>Author(s): {book.authors} </p>
                      <FormBtnDelete onClick={() => this.deleteBook(book._id)} >Delete</FormBtnDelete>
                      <FormBtnView href={book.preview} >View</FormBtnView>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <img src={book.image} alt="Book Cover" className="img-thumbnail" />
                    </div>
                    <div className="col-10">
                      <p>Description: {book.description}</p>
                    </div>
                  </div>
                </BookCard>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
