const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)

})

blogsRouter.post('/blogs', middleware.userExtractor, async (request, response) => {
  let requestWithDefault = request.body.likes ? request.body : { ...request.body, likes: 0 }
  const user = await User.findById(request.user)

  if(!requestWithDefault.title || !requestWithDefault.url) {
    response.status(400).end()
    return
  }

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({ ...requestWithDefault, user: user._id })

  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  await newBlog.populate('user', { username: 1, name: 1, id: 1 })

  response.status(201).json(newBlog)
})

blogsRouter.delete('/blogs/:id', middleware.userExtractor, async (request, response) => {
  if(request.token === null) return response.status(401).json({ error: 'no token' })

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blogCreator = await Blog.findById(request.params.id)
  if(request.user !== blogCreator.user.toString()) return response.status(401).json({ error: 'token invalid' })

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/blogs/:id', async (request, response) => {
  const { id } = request.params

  const { title, author, url, likes } = request.body
  const update = { title, author, url, likes }

  const updated = await Blog.findByIdAndUpdate(id, update,{ new: true, runValidators: true })

  if (!updated) return response.status(404).end()
  return response.status(200).json(updated)
})

module.exports = blogsRouter