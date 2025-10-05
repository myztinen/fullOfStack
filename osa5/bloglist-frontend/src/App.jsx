import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [infomessage, setInfoMessage] = useState(null)
  const [notificationStyle, setStyle] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setStyle('info')
      setInfoMessage(`${user.name} successfully logged in`)
      setTimeout(() => {setInfoMessage(null)}, 5000)
    } catch {
      setStyle('error')
      setInfoMessage('wrong username or password')
      setTimeout(() => {
        setInfoMessage(null)}, 5000)
    }
  }

  const handleusernameChange = async event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = async event => {
    setPassword(event.target.value)
  }

  const handleLogoutClick = async () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blogObject) => {
    try {
      const returnMessage = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnMessage))
      setStyle('info')
      setInfoMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {setInfoMessage(null)}, 5000)
    } catch {
      setStyle('error')
      setInfoMessage('something went wrong :/')
      setTimeout(() => {
        setInfoMessage(null)}, 5000)
    }
  }

  const likeUpdater = async (id, blogObject) => {
    try {
      const returnMessage = await blogService.update(id, blogObject)
      const newBlogs = blogs.map(item => {
        if (item.id === returnMessage.id) {
          return { ...item, likes: returnMessage.likes }
        } else return item
      })
      setBlogs(newBlogs)

    } catch {
      setStyle('error')
      setInfoMessage('something went wrong when Adding likes')
      setTimeout(() => {
        setInfoMessage(null)}, 5000)
    }
  }

  const blogDeleter = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(item => item.id !== id))

    } catch {
      setStyle('error')
      setInfoMessage('something went wrong when deleting blog')
      setTimeout(() => {
        setInfoMessage(null)}, 5000)
    }
  }

  const newBlogForm = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      {!user && (<div><Notification message={infomessage} notificationStyle={notificationStyle} />
        <LoginForm username={username} password={password} loginHandler={handleLogin} usernameChange={handleusernameChange} passwordChange={handlePasswordChange}/></div>)}
      {user && (<div>
        <h2>blogs</h2>
        <Notification message={infomessage} notificationStyle={notificationStyle} />
        <div>{user.name} logged in<button onClick={handleLogoutClick}>logout</button></div><br></br>
        {newBlogForm()}
        {blogs.sort((a,b) => a.likes < b.likes).map(blog => <Blog key={blog.id} blog={blog} updateBlog={likeUpdater} deleteBlog={blogDeleter} userId={user.id}/>)}
      </div>)}
    </div>
  )
}

export default App