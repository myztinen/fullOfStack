import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addblog = async event => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (<>
    <h2> create new</h2>
    <form onSubmit={addblog}>
      <div>
        <label>
            title:
          <input
            type="text"
            value={blogTitle}
            onChange={event => setTitle(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
            author:
          <input
            type="text"
            value={blogAuthor}
            onChange={event => setAuthor(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
            url:
          <input
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  </>
  )}

export default BlogForm