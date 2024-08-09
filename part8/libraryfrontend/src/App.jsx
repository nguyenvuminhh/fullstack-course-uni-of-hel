import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";
import { ALL_BOOKS, BOOK_ADDED, BOOK_BY_GENRE } from "./queries";
import { useQuery, useSubscription } from "@apollo/client";


const App = () => {

  const [notification, setNotification] = useState(null)
  const notify = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  useQuery(BOOK_BY_GENRE)
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} is added`)
      client.cache.updateQuery({ query: BOOK_BY_GENRE, variables: {genre: 'all genres'} }, ({ allBooks }) => {
        return {
          allBooks: (allBooks.concat(addedBook)),
        }
      })
    }
  })

  const [page, setPage] = useState("authors")

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendation")}>recommendation</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>

      <Notification message={notification} />

      <Authors show={page === "authors"} notify={notify}/>

      <Books show={page === "books"} notify={notify}/>

      <NewBook show={page === "add"} notify={notify}/>

      <Login show={page === "login"} notify={notify} />

      <Recommendation show={page === "recommendation"} />
      
    </div>
  );
};

export default App;
