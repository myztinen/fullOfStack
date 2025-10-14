import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteWithId } from '../reducers/anecdoteReducer'
import { setNotification }  from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(
                                  item => item.content?.toLowerCase()
                                                        .includes(state.anecdoteFilter.toLowerCase())
                                  )})
 
  const dispatch = useDispatch()

  const vote = (id) => {
      const anecdoteContent = anecdotes.find(ane => ane.id === id).content
      dispatch(voteAnecdoteWithId(id))
      dispatch(setNotification(`You voted '${anecdoteContent}'`, 10))
    }

  return(
    <div>
      {anecdotes?.toSorted((a,b) => b.votes-a.votes ).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
    )
}

export default AnecdoteList