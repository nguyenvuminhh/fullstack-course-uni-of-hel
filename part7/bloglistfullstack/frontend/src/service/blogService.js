import axios from 'axios'
const baseURL = 'http://localhost:3003/api/blogs/'

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const createNew = async ({ newBlog, token }) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    const res = await axios.post(baseURL, newBlog, config)
    return res.data
}

const like = async (id) => {
    const blogs = await getAll()
    const likedBlog = blogs.find(a => a.id === id)
    const newBlog = {...likedBlog, likes: likedBlog.likes + 1, user: likedBlog.user.id}
    const res = await axios.put(baseURL+id, newBlog)
    return res.data
}

const deleteBlog = async ({ id, token }) => {
    const config = {headers: {Authorization: 'Bearer ' + token}}
    await axios.delete(baseURL + id, config)
    return id
}

const comment = async ({ id, comment }) => {
    const res = await axios.post(baseURL + id + '/comments', { comment })
    return res.data
}

export default { getAll, createNew, like, deleteBlog, comment }