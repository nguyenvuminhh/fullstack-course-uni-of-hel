import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAll, voteFor } from "../service/anecdoteService"
import { useNotiDispatch, useNotify, useNotiValue } from "../NotiContext"

const AnecdoteList = () => {
    const dispatch = useNotiDispatch()
    const notify = useNotify(dispatch)
    const queryClient = useQueryClient()

    const fetchAllResult = useQuery({
        queryKey: ['fetchAll'],
        queryFn: getAll,
        refetchOnWindowFocus: false
    })


    const anecdotes = fetchAllResult.data

    const voteMutation = useMutation({
        mutationKey: ['vote'],
        mutationFn: (id) => voteFor({id, queryClient}),
        onSuccess: (updated) => {
            const id = updated.id
            const anecdotes = queryClient.getQueryData(['fetchAll'])
            queryClient.setQueryData(['fetchAll'], anecdotes.map(a => a.id === id ? updated : a))
            const message = `You voted for \'${updated.content}\'`
            notify(message)
        }
    })

    const handleVote = (id) => {
        voteMutation.mutate(id)
    }

    if (fetchAllResult.isLoading) {
        return <p>is loading...</p>
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList