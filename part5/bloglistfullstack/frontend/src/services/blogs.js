import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const addBlog = async (newBlog) => {
  const config = { headers: { Authorization: 'Bearer ' + window.localStorage.getItem('token') } }
  await axios.post('/api/blogs', newBlog, config)
}

const likeBlog = async (id) => {
  const newID = id.replace('lk', '')
  const blog = (await axios.get(baseUrl+newID)).data
  await axios.put(baseUrl+newID, {...blog, likes: blog.likes+1, user: blog.user.id})
}

const deleteBlog = async (id) => {
  const newID = id.replace('rmv', '')
  const config = {headers: {Authorization: 'Bearer ' + window.localStorage.getItem('token')}}
  await axios.delete(baseUrl+newID, config)
}

export default { getAll, addBlog, likeBlog, deleteBlog }