import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)  
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)    
    },
  },
})

export const initializeNotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newNote))
  }}

export const voteAnecdoteWithId = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
    const newAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(voteAnecdote(newAnecdote.id))
  }}



export const { voteAnecdote, setAnecdotes, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer