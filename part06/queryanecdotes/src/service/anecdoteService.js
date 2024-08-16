import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

const baseUrl = 'http://localhost:3001/anecdotes/'

export const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const createNew = async (content) => {
    const newObj = {
        content,
        votes: 0
    }
    const res = await axios.post(baseUrl, newObj)
    return res.data
}

export const voteFor = async ({ id, queryClient }) => {
    const anecdotes = queryClient.getQueryData(['fetchAll'])
    const votedAnecdote = anecdotes.find(a => a.id === id)
    const newInfo = {votes: votedAnecdote.votes+1}
    const res = await axios.patch(baseUrl+id, newInfo)
    return res.data
}