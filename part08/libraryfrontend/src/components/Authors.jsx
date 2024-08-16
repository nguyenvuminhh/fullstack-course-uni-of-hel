import { useQuery, gql } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import SetBorn from "./SetBorn"

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const fetchAuthors = useQuery(ALL_AUTHORS)

  if (fetchAuthors.loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }

  const authors = fetchAuthors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBorn notify={props.notify}/>
    </div>
  )
}

export default Authors
