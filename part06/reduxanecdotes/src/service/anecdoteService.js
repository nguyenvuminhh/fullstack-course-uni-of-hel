const baseURL = 'http://localhost:3001/anecdotes/'
import axios from 'axios'

const getAll = async () => {
    const res = await axios.get(baseURL)
    console.log(res.data)
    return res.data
}

const createNew = async (content) => {
    await axios.post(baseURL, {
        content,
        votes: 0
    })
}

const vote = async (id) => {
    const anecdotes = await getAll()
    const votedAnecdote = anecdotes.find(a => a.id === id)
    await axios.put(baseURL+id, {
        ...votedAnecdote, 
        votes: votedAnecdote.votes+1
    })
}

export default { getAll, createNew, vote }