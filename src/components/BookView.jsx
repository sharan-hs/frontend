import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import BookList from "./BookList";
import BookForm from "./BookForm";
import { useNavigate } from "react-router-dom";

const BookView = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((store) => store.book);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);
  return (
    <div className="min-h-[100vh]">
      {status == "Loading" && (
        <p className="text-[48px] text-center text-white py-48">
          Loading .....
        </p>
      )}
      {error && <p>Error occurred fetching Data</p>}
      {books && <BookList books={books} />}
      <button
        onClick={() => navigate("/bookForm")}
        type="submit"
        className="px-4 py-2 mx-56 mt-4 mb-12 rounded-lg bg-[#16325B] text-white"
      >
        Add Book
      </button>
    </div>
  );
};

export default BookView;
