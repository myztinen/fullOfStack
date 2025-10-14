
import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notifications',
  initialState:'',
  reducers: {
    setMessage(state, action){
      return action.payload
    }
  },
})

export const setNotification = (message, timeInSeconds) => {
  return async dispatch => {
      dispatch(setMessage(message))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 1000*timeInSeconds)
  }}



export const { setMessage } = notificationSlice.actions
export default notificationSlice.reducer