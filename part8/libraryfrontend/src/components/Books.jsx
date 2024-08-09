import { gql, useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES, BOOK_BY_GENRE } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("all genres")
  const fetchGenres = useQuery(ALL_GENRES)
  const fetchBooks = useQuery(BOOK_BY_GENRE, {variables: {genre: selectedGenre}})
  
  if (!props.show) {
    return null
  }

  if (fetchBooks.loading || fetchGenres.loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }

  const genres = [...new Set(fetchGenres.data.allGenres)].concat("all genres")
  const books = fetchBooks.data.allBooks

  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr key={"head"}>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title+a.author.name+a.published}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(a => <button key={Math.random()*1200000} onClick={() => setSelectedGenre(a)}>{a}</button>)}
    </div>
  )
}

export default Books
