import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
 
const Store = configureStore( {
    reducer: {
        anecdotes: anecdoteReducer,
        anecdoteFilter: filterReducer,
        notification: notificationReducer
    }
})

export default Store