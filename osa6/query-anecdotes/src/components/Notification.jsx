import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notificationText } = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notificationText) return null

  return (
    <div style={style}>
      {notificationText}
    </div>
  )
}

export default Notification
