const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  subtitle: String,
  authors: { type: String, required: true },
  description: String,
  preview: String,
  image: { type: String, required: false }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;