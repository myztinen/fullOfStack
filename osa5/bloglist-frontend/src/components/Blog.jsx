import { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
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
  const buttonStyle = { display: blog.user?.username === username ? '' : 'none' }

  const blogDeleter = async event => {
    if(window.confirm('Do you want to remove this entry?')) {
      event.preventDefault()
      deleteBlog(blog.id)
    }
  }

  if(infoHidden) {
    return (
      <div className='closedBlogItem' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={hideInfo}>view</button>
      </div>
    )
  } else {
    return (
      <div className='openBlogItem' style={blogStyle}>
        <div className='title'>{blog.title} {blog.author}<button onClick={showInfo}>hide</button><br/></div>
        <div>{blog.url} <br/></div>
        <div className='likes'>likes {blog.likes} <button onClick={likeUpdater}>like</button><br/></div>
        <div>{blog.user?.name ?? 'unknown user'} <br/></div>
        <div><button style={buttonStyle} onClick={blogDeleter}>remove</button></div>
      </div>
    )
  }
}

export default Blog