import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addBook, editBook } from "../redux/bookSlice";

const BookForm = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const id = useParams().bookId;
  console.log(location, id);

  useEffect(() => {
    if (id) {
      setBookTitle(location.state.bookName);
      setAuthor(location.state.author);
      setGenre(location.state.genre);
    }
  }, []);

  const formHandler = (e) => {
    e.preventDefault();
    const newBook = {
      bookName: bookTitle,
      author: author,
      genre: genre,
    };
    if (id) {
      dispatch(editBook({ id, newBook }));
    } else {
      dispatch(addBook(newBook));
    }
    navigate("/");
  };

  return (
    <div className="bg-[#6482AD] flex  items-center min-h-[100vh]">
      <form
        onSubmit={formHandler}
        className="w-[600px] bg-[#F5EDED] shadow-2xl rounded-xl h-[600px] mx-auto py-12"
      >
        <p className="text-2xl mx-8 my-8 text-[#16325B]">
          {id ? "Edit Book" : "Add new Book"}
        </p>
        <label className="text-[#16325B] mx-8">BookTitle: </label>
        <input
          type="text"
          className="mb-4 px-2 w-[20vw] py-1 rounded-md"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />
        <br />
        <label className="text-[#16325B] mx-8">Author: </label>
        <input
          type="text"
          className="ml-5 mb-4 px-2 w-[20vw] py-1 rounded-md"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <br />
        <label className="text-[#16325B] mx-8">Genre: </label>
        <input
          type="text"
          className="ml-6 mb-4 px-2 w-[20vw] py-1 rounded-md"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="px-4 py-2 m-8 rounded-lg bg-[#16325B] text-white"
        >
          {id ? " Save Edit" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
