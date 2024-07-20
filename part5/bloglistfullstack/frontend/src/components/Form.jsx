import { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ username, password, usernameChange, passwordChange, handleLogin }) => {
    return (
        <form onSubmit={handleLogin}>
            <p>name: <input type='text' value={username} onChange={usernameChange}/></p>
            <p>password: <input type='password' value={password} onChange={passwordChange}/></p>
            <button type='submit'>login</button>
        </form>
    )
}

const AddBlog = ({ addBlog }) => {
    // BLOG ATTRIBUTES FIELDS
    const [blogTitle, setBlogTitle] = useState('')
    const blogTitleChange = (event) => setBlogTitle(event.target.value)
    const [blogAuthor, setBlogAuthor] = useState('')
    const blogAuthorChange = (event) => setBlogAuthor(event.target.value)
    const [blogURL, setBlogURL] = useState('')
    const blogURLChange = (event) => setBlogURL(event.target.value)

    // HANDLE ADDING BLOG
    const handleAddBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
          title: blogTitle,
          author: blogAuthor,
          url: blogURL
        }
        addBlog(newBlog)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogURL('')
      }

    return (
        <form onSubmit={handleAddBlog}>
            <p>title: <input type='text' value={blogTitle} onChange={blogTitleChange}></input></p>
            <p>author: <input type='text' value={blogAuthor} onChange={blogAuthorChange}></input></p>
            <p>url: <input type='text' value={blogURL} onChange={blogURLChange}></input></p>
            <button type='submit'>add blog</button>
        </form>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired, 
    password: PropTypes.string.isRequired, 
    usernameChange: PropTypes.func.isRequired, 
    passwordChange: PropTypes.func.isRequired, 
    handleLogin: PropTypes.func.isRequired
}

AddBlog.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default { Login, AddBlog }