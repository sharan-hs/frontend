import { BACKEND_URL } from "../utils/helper";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("/fetchBooks", async () => {
  const response = await fetch(`${BACKEND_URL}/books`);
  const data = await response.json();

  return data;
});

export const addBook = createAsyncThunk("/books/add", async (bookObj) => {
  const response = await fetch(`${BACKEND_URL}/books`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(bookObj),
  });
  const data = await response.json();
  console.log(data);
  return data;
});

export const editBook = createAsyncThunk(
  "/books/edit",
  async ({ id, newBook }) => {
    const bookId = id;
    const bookObj = newBook;
    console.log(bookId, bookObj);
    const response = await fetch(`${BACKEND_URL}/book/edit/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const deleteBook = createAsyncThunk("/books/delete", async (bookId) => {
  const response = await fetch(`${BACKEND_URL}/books/${bookId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(data.book);
  return data.book;
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "Success";
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.error = `Error occurred`;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.status = "Success";
      state.books = [...state.books, action.payload];
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.status = "Success";
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
    });
    builder.addCase(editBook.fulfilled, (state, action) => {
      state.status = "Success";
      const updatedBook = action.payload;

      state.books.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      );
    });
  },
});

export default bookSlice.reducer;
