const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const adder = (totals, newLikes) => {
    return totals+newLikes.likes
  }
  return blogs.reduce(adder,0)
}

const favoriteBlog = (blogs) =>  {
  if (blogs.length === 0) return null
  const comparison = (returnable, newValue) => {
    return returnable.likes >= newValue.likes ? returnable : newValue
  }
  return blogs.reduce(comparison, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const countedBlogs = _(blogs).countBy('author')
    .map((count, name) => ({ 'author':name, 'blogs':count }))
    .value()
  const comparison = (returnable, newValue) => {
    return returnable.likes >= newValue.likes ? returnable : newValue
  }
  return countedBlogs.reduce(comparison, countedBlogs[0])

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  return _(blogs).groupBy('author').map((posts, author) => ({
    author,
    likes: _.sumBy(posts, 'likes'),
  }
  )).maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}