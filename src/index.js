import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import BookForm from "./components/BookForm";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/bookForm",
    element: <BookForm />,
  },
  {
    path: "/editForm/:bookId",
    element: <BookForm />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
