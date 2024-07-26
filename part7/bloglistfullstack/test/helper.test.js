const assert = require("node:assert")
const { describe, test } = require("node:test")
const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []
  assert.strictEqual(listHelper.dummy(blogs), 1)
})

describe("total likes", () => {
  test("of an empty list is zero", () => {
    const blogs = []
    assert.strictEqual(listHelper.totalLikes(blogs), 0)
  })

  test("of a list with 1 blog is the likes of that blog", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ]
    assert.strictEqual(listHelper.totalLikes(blogs), 5)
  })

  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 25,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 9,
        __v: 0,
      },
    ]
    assert.strictEqual(listHelper.totalLikes(blogs), 9 + 5 + 15 + 25)
  })
})

describe("favourite blog", () => {
  test("of an empty list is null", () => {
    const blogs = []
    assert.strictEqual(listHelper.favouriteBlog(blogs), null)
  })

  test("of a list with 1 blog is that blog", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ]
    assert.strictEqual(listHelper.favouriteBlog(blogs), blogs[0])
  })

  test("of a bigger list is the blog with most like", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 25,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 9,
        __v: 0,
      },
    ]
    assert.strictEqual(listHelper.favouriteBlog(blogs), blogs[1])
  })
})

describe("author with most blogs", () => {
  test("of an empty list is null", () => {
    const blogs = []
    assert.equal(listHelper.mostBlog(blogs), null)
  })

  test("of a list with 1 blog is that blog's author", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ]
    assert.strictEqual(listHelper.mostBlog(blogs).author, "Edsger W. Dijkstra")
    assert.strictEqual(listHelper.mostBlog(blogs).blogs, 1)
  })

  test("of a bigger list is calculated correctly", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra1",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra1",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 25,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 9,
        __v: 0,
      },
    ]
    assert.strictEqual(
      listHelper.mostBlog(blogs).author,
      "Edsger W. Dijkstra1",
    )
    assert.strictEqual(listHelper.mostBlog(blogs).blogs, 2)
  })
})

describe("author with most likes", () => {
  test("of an empty list is null", () => {
    const blogs = []
    assert.equal(listHelper.mostLike(blogs), null)
  })

  test("of a list with 1 blog is that blog's author", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ]
    assert.strictEqual(listHelper.mostLike(blogs).author, "Edsger W. Dijkstra")
    assert.strictEqual(listHelper.mostLike(blogs).likes, 5)
  })

  test("of a bigger list is calculated correctly", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra1",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra1",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 25,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 9,
        __v: 0,
      },
    ]
    assert.strictEqual(
      listHelper.mostLike(blogs).author,
      "Edsger W. Dijkstra1",
    )
    assert.strictEqual(listHelper.mostLike(blogs).likes, 30)
  })
})
