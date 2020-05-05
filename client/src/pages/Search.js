import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
// import { Link } from "react-router-dom";
import API from "../utils/API";
import { Input, FormBtn } from "../components/SearchForm";
import BookCard from "../components/BookCard";

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
        .then(res => this.setState({"books": res.data.items}))
        .catch(err => console.log(err));
    }
    this.state.query = "";
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
              </FormBtn>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col size="sm-12">
            <Container fluid>
              <h2>Results</h2>
              {this.state.books.map(book => (
                <div>
                <BookCard
                  author={book.volumeInfo.authors}
                  title={book.volumeInfo.title}
                  subtitle={book.volumeInfo.subtitle}
                  image={book.volumeInfo.imageLinks.thumbnail}
                  description={book.volumeInfo.description}
                />
                </div>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
