const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')



const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const createTestUsers = async () => {
  const passwordHash = await bcrypt.hash('salasana', 10)
  const passwordHash2 = await bcrypt.hash('salaisuus', 10)
  const user = new User({ name:'Perus Kayttaja', username: 'perska', passwordHash })
  const user2 = new User({ name:'Teppo Kayttaja', username: 'tepondeeros', passwordHash2 })

  await user.save()
  await user2.save()
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb,usersInDb, createTestUsers
}