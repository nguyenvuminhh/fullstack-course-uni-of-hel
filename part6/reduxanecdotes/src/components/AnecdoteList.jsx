import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notiReducer'
const AnecdoteList = () => {
    
    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(state.keyword.toLowerCase())))
    const dispatch = useDispatch()
    const vote = async (id) => {
        dispatch(voteFor(id))
        const votedAnecdote = anecdotes.find(a => a.id === id)
        const message = `You voted for \'${votedAnecdote.content}\'`
        dispatch(setNoti(message, 5))
      } 
    return(
        <div>
            {anecdotes.sort((a, b) => b.votes-a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button id={anecdote.id} onClick={async () => await vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList