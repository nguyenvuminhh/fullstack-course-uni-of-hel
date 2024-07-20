import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibility, setVisibility] = useState(false)
  const toggleVisibility = () => setVisibility(!visibility)
  const removable = props.blog.user.username === window.localStorage.getItem('username')

  if (visibility){
    return (
      <div style={blogStyle}>
        <p>{props.blog.title} {props.blog.author}<button onClick={toggleVisibility}>hide</button></p>
        <p>{props.blog.url}</p>
        <p className='likeNumber'>{props.blog.likes} <button className='likeButton' data-test-id={'lk' + props.blog.id} id={'lk' + props.blog.id} onClick={props.handleLike}>like</button></p>
        <p>{props.blog.user.name}</p>
        {removable ? <button id={'rmv' + props.blog.id} onClick={props.handleDelete}>remove</button> : null}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{props.blog.title} {props.blog.author} <button className='showButton' onClick={toggleVisibility}>show</button></p>
    </div>
  )
}

Blog.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
}

export default Blog