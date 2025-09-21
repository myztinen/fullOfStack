const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

blogsRouter.post('/blogs', async (request, response) => {
  let requestWithDefault = request.body.likes ? request.body : {...request.body, likes: 0 }

  if(!requestWithDefault.title || !requestWithDefault.url) {
      response.status(400).end()
      return
  }

  const blog = new Blog(requestWithDefault)

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
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