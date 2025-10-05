import { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
  const [infoHidden, setVisibility] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showInfo = () => {
    setVisibility(true)
  }

  const hideInfo = () => {
    setVisibility(false)
  }

  const likeUpdater = async event => {
    event.preventDefault()
    updateBlog(blog.id, {
      user: blog.user?.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
    })
  }
  const buttonStyle = { display: blog.user?.id === userId? 'none' : '' }

  const blogDeleter = async event => {
    if(window.confirm('Do you want to remove this entry?')) {
      event.preventDefault()
      console.log(blog.id)
      deleteBlog(blog.id)
    }
  }

  if(infoHidden) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={hideInfo}>view</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={showInfo}>hide</button><br/>
      likes {blog.likes} <button onClick={likeUpdater}>like</button><br/>
        {blog.user?.name ?? 'unknown user'} <br/>
        <button style={buttonStyle} onClick={blogDeleter}>remove</button><br/>
      </div>
    )
  }
}

export default Blog