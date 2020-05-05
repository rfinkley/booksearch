import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export function FormBtn_Save(props) {
    return (
      <a {...props} className="btn btn-success bookCard-btn-save">
        {props.children}
      </a>
    );
}

export function FormBtn_View(props) {
    return (
      <a {...props} href={props.href} className="btn btn-success bookCard-btn-view">
        {props.children}
      </a>
    );
}

function BookCard(props) {

  return (
    <div className="container my-4">
        <div className="row">
            <div className="col">
                <h2>{props.title}</h2>
                <p>Subtitle: {props.subtitle}</p>
                <p>Author(s): {props.author}</p>
                <FormBtn_View href={props.preview} >View</FormBtn_View>
                <FormBtn_Save >Save</FormBtn_Save>
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                <img src={props.image} alt="Book Cover" className="img-thumbnail" />
            </div>
            <div className="col-10">
                <p>Description: {props.description}</p>
            </div>
        </div>
    </div>
  );
}

export default BookCard;