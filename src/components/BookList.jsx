import React from "react";
import { deleteBook } from "../redux/bookSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookList = ({ books }) => {
  console.log(books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBookHandler = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const editHandler = (book) => {
    navigate(`/editForm/${book._id}`, { state: book });
  };
  return (
    <div>
      <h1 className="text-[#F5EDED] pt-8 text-center text-[48px]">BookList</h1>
      {books?.map((book) => (
        <div
          className="bg-[#F5EDED] rounded-lg shadow-xl flex justify-between w-[1000px] p-4 mx-auto my-8"
          key={book._id}
        >
          <div className="">
            <p className="text-2xl font-bold">Book Title: {book?.bookName}</p>
            <p className="py-2 text-lg">Author: {book?.author}</p>
            <p className="pb-2 text-lg">Genre: {book?.genre}</p>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <button
              onClick={() => editHandler(book)}
              className="bg-[#16325B] cursor-pointer text-white px-4 py-1 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBookHandler(book._id)}
              className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
