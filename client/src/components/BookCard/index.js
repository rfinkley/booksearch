import React from "react";
import "./style.css";

export function FormBtnSave(props) {
    return (
      <button {...props} className="btn btn-success bookCard-btn-save">
        {props.children}
      </button>
    );
}

export function FormBtnView(props) {
    return (
      <a {...props} href={props.href} className="btn btn-success bookCard-btn-view">
        {props.children}
      </a>
    );
}

export function BookCard(props) {
  return (
    <div className="container my-4">
      {props.children}
    </div>
  );
}