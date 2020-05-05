import axios from "axios";

export default {
    //Search Google Books for book
    bookSearch: function(query) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
    }
};