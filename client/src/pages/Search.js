import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
import { Input, FormBtn } from "../components/SearchForm";
import {FormBtnSave, FormBtnView, BookCard} from "../components/BookCard";

class Books extends Component {
  state = {
    books: [],
    query: "",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      API.bookSearch(this.state.query)
        .then(res => {
          this.setState({"books": res.data.items})
        }) 
        .catch(err => console.log(err));
    }
    this.setState({query: ""});
  };

  handleSave = event => {
    console.log(this.state.books[event].volumeInfo.authors.join(", "));
    console.log(this.state.books[event].volumeInfo.title);
    console.log(this.state.books[event].volumeInfo.subtitle);
    console.log(this.state.books[event].volumeInfo.imageLinks.thumbnail);
    console.log(this.state.books[event].volumeInfo.description);
    console.log(this.state.books[event].volumeInfo.previewLink);
    
    API.saveBook({
      authors: this.state.books[event].volumeInfo.authors.join(", "),
      title: this.state.books[event].volumeInfo.title,
      subtitle: this.state.books[event].volumeInfo.subtitle,
      image: this.state.books[event].volumeInfo.imageLinks.thumbnail,
      description: this.state.books[event].volumeInfo.description,
      preview: this.state.books[event].volumeInfo.previewLink
    })
    .catch(err => console.log(err));
  }

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
              <h2>Book Search</h2>
              <Input 
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Enter book title"
              />
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn >
            </Container>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Container fluid>
              <h2>Results</h2>
              {this.state.books.map( (book, index) => (
                <BookCard key={index} className="container my-4">
                  <div className="row">
                    <div className="col">
                      <h2>{book.volumeInfo.title}</h2>
                      <p>Subtitle: {book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "No Subtitle"}  </p>
                      <p>Author(s): {book.volumeInfo.authors}</p>
                      <FormBtnSave onClick={() => this.handleSave(index)} >Save</FormBtnSave>
                      <FormBtnView href={book.volumeInfo.previewLink} >View</FormBtnView>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book Cover" className="img-thumbnail" />
                    </div>
                    <div className="col-10">
                      <p>Description: {book.volumeInfo.description}</p>
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
