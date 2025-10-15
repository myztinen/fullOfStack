import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateNote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'



const App = () => {
  const queryClient = useQueryClient()
const { notificationDispatch } = useContext(NotificationContext)


  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateNote,
    onSuccess: (updatedAnecdote) => {
      const anecs = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecs.filter(item => item.id != updatedAnecdote.id).concat(updatedAnecdote)
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notificationDispatch({type: 'SET', payload:`Anecdote '${updatedAnecdote.content}' voted`})
      setTimeout(() => {
        notificationDispatch({type: 'DEL'})
      }, 5000)
    }
   })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  console.log(JSON.parse(JSON.stringify(result)))
  if ( result.isLoading ) {
    return <div>loading data...</div>  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
