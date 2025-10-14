import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdoteInput.value
    dispatch(createAnecdote({content: anecdote, votes:0}))
    dispatch(setNotification(`You created ${anecdote}`, 10))
    event.target.anecdoteInput.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdoteInput" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm