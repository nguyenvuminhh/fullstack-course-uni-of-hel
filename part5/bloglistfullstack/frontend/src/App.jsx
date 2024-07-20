import './index.css'
import { useState, useEffect, useRef } from 'react'
// COMPONENT
import Blog from './components/Blog'
import Forms from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// SERVICE
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // NOTIFICATION
  const [noti, setNoti] = useState('')
  const [notiType, setNotitype] = useState('')
  const notify = (content, type) => {
    setNotitype(type)
    setNoti(content)
    setTimeout(() => {
      setNotitype('')
      setNoti('')
    }, 4000)
  }

  // USER
  const [user, setUser] = useState(window.localStorage.getItem('name'))

  // USERNAME AND PASSWORD FIELD
  const [password, setPassword] = useState('')
  const passwordChange = (event) => setPassword(event.target.value)
  const [username, setUsername] = useState('')
  const usernameChange = (event) => setUsername(event.target.value)

  // HANDLE LOGIN AND LOGOUT
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginRes = await loginService.login(username, password)
      window.localStorage.setItem('token', loginRes.data.token)
      window.localStorage.setItem('name', loginRes.data.name)
      window.localStorage.setItem('username', loginRes.data.username)
      setPassword('')
      setUsername('')
      setUser(loginRes.data.name)
      notify(loginRes.data.name + ' has logged in', 'annoucement')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('name')
    setUser('')
  }

  // BLOG
  const [blogs, setBlogs] = useState([])
  
  // REF
  const blogRef = useRef()

  // HANDLE ADDING BLOGS
  const [refreshBlog, setRefreshBlog] = useState(true)
  const addBlog = async (newBlog) => {
    blogRef.current.toggleVisibility()
    try {
      await blogService.addBlog(newBlog)
      notify(newBlog.title + ' by ' + newBlog.author + ' is added', 'annoucement')
    } catch (error) {
      notify(error.response.data.error, 'error')
    }  
    setRefreshBlog(!refreshBlog)
  }

  // HANDLE LIKING BLOG
  const handleLike = async (event) => {
    await blogService.likeBlog(event.target.id)
    setRefreshBlog(!refreshBlog)
  }

  // HANDLE DELETING BLOG
  const handleDelete = async (event) => {
    await blogService.deleteBlog(event.target.id)
    setRefreshBlog(!refreshBlog)
  }

  // RENDER ALL BLOG
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    })  
  }, [refreshBlog])

  // CASE NO USER FOUND
  if (!user) {
    return (
      <div>
        <h1>Login</h1>
        <Notification noti={noti} notiType={notiType} />
        <Forms.Login 
          username={username}
          usernameChange={usernameChange}
          password={password}
          passwordChange={passwordChange}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  // CASE ALREADY LOGGED IN
  return (
    <div>
      <h1>Blogs</h1>
      <Notification noti={noti} notiType={notiType} />
      <p>{user} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable className='newBlog' text='New blog' ref={blogRef}>
        <h2>New blog</h2>
        <Forms.AddBlog 
            addBlog={addBlog}
        />
      </Togglable>
      <br />
      {blogs.map(blog =>
        <Blog 
          handleDelete={handleDelete}
          key={blog.id} 
          blog={blog} 
          handleLike={handleLike}
        />
      )}
    </div>
  )
}

export default App