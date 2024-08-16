import { Link } from "react-router-dom"

const SingAnecdote = (props) => {
    return (
        <li>
            <Link to={'/anecdotes/' + props.id}>
                {props.content}
            </Link>
        </li>
    )
}

const AnecdoteList = ({ anecdotes }) => (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <SingAnecdote key={anecdote.id} {...anecdote}/>)}
      </ul>
    </div>
  )

export default AnecdoteList
