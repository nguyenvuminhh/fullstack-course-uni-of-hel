const dummy = (blog) => 1

const totalLikes = (blogs) => {
  const result = blogs.map((a) => a.likes).reduce((a, b) => a + b, 0)
  return result
}

const favouriteBlog = (blogs) => {
  const maxLike = Math.max(...blogs.map((a) => a.likes))
  const maxIndex = blogs.map((a) => a.likes).indexOf(maxLike)
  return blogs.length === 0 ? null : blogs[maxIndex]
}

const mostBlog = (blogs) => {
  const map = new Map()
  if (blogs.length === 0) {
    return null
  }
  for (let i = 0; i < blogs.length; i++) {
    let oldValue = map.get(blogs[i].author)
    let value = oldValue == undefined ? 1 : oldValue + 1
    map.set(blogs[i].author, value)
  }
  let largestValue = -Infinity
  let largestKey = null

  map.forEach((value, key) => {
    if (value > largestValue) {
      largestKey = key
      largestValue = value
    }
  })
  return { author: largestKey, blogs: largestValue }
}

const mostLike = (blogs) => {
  const map = new Map()
  if (blogs.length === 0) {
    return null
  }
  for (let i = 0; i < blogs.length; i++) {
    let oldValue = map.get(blogs[i].author)
    let value =
      oldValue == undefined ? blogs[i].likes : oldValue + blogs[i].likes
    map.set(blogs[i].author, value)
  }
  let largestValue = -Infinity
  let largestKey = null

  map.forEach((value, key) => {
    if (value > largestValue) {
      largestKey = key
      largestValue = value
    }
  })
  return { author: largestKey, likes: largestValue }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlog, mostLike }
