import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleTitleChange = async event => {    
    setTitle(event.target.value)
  }
  
  const handleAuthorChange = async event => {    
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = async event => {    
    setUrl(event.target.value)
  }
  
  const handleCreateBlog = async event => {    
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: url,
    }
    try {
      const returnMessage = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnMessage))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const blogForm = () => (
  <>
    <h2> create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={blogTitle}
              onChange={handleTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={blogAuthor}
              onChange={handleAuthorChange}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
  

  return (
    <div>
      {!user && (<div><Notification message={infomessage} notificationStyle={notificationStyle} />
        <LoginForm username={username} password={password} loginHandler={handleLogin} usernameChange={handleusernameChange} passwordChange={handlePasswordChange}/></div>)}
      {user && (<div>
          <h2>blogs</h2>
          <Notification message={infomessage} notificationStyle={notificationStyle} />
          <div>{user.name} logged in<button onClick={handleLogoutClick}>logout</button></div><br></br>
          {blogForm()}
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>)}
    </div>
  )
}

export default App