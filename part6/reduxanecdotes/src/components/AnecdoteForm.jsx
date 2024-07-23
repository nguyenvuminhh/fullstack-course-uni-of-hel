import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNoti } from '../reducers/notiReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        dispatch(addAnecdote(document.getElementById('addAnecdote').value))
        const message = `You added \'${document.getElementById('addAnecdote').value}\'`
        dispatch(setNoti(message, 5))
        document.getElementById('addAnecdote').value=''
    }
    
    return(
        <div>
            <h2>create new</h2>
            <form>
                <div><input id='addAnecdote' /></div>
                <button onClick={add}>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm