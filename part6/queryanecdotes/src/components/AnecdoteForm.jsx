import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../service/anecdoteService'
import { useNotiDispatch, useNotify } from '../NotiContext'

const AnecdoteForm = () => {
  const dispatch = useNotiDispatch()
  const notify = useNotify(dispatch)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationKey: ['createNew'],
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['fetchAll'])
      queryClient.setQueriesData(['fetchAll'], anecdotes.concat(newAnecdote))
      const message = `You added \'${newAnecdote.content}\'`
      notify(message)
    },
    onError: (error) => {
      const message = error.response.data.error
      notify('Error: ' + error.response.data.error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
