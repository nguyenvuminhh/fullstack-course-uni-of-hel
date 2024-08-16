import { Route, Routes, Link, useMatch } from "react-router-dom"
import BlogForm from "./component/BlogForm"
import BlogList from "./component/BlogList"
import LoginForm from "./component/LoginForm"
import Users from "./component/Users"
import User from "./component/User"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import blogService from "./service/blogService"
import userService from "./service/userService"
import Blog from "./component/Blog"
import Navigation from "./component/Navigation"
import Notification from "./component/Notification"
import About from "./component/About"
import UserForm from "./component/UserForm"

const App = () => {

    // HOOKS
    const userMatch = useMatch('/users/:id')
    const blogMatch = useMatch('/blogs/:id')
    const fetchUser = useQuery({
        queryKey: ['fetchUser'],
        queryFn: userService.getAll
    })    
    const fetchBlog = useQuery({
        queryKey: ['fetchBlog'],
        queryFn: blogService.getAll
    })

    // USERS AND BLOG
    const users = fetchUser.data
    const blogs = fetchBlog.data

    // RETURN IF LOADING
    if (fetchBlog.isLoading || fetchUser.isLoading) {
        return <p>loading...</p>
    }
    if (fetchBlog.isError || fetchUser.isError) {
        return <p>error while fetching data</p>
    }

    // SELECTED OBJECTS
    const selectedUser = userMatch ? users.find(a => a.id === userMatch.params.id) : null
    const selectedBlog = blogMatch ? blogs.find(a => a.id === blogMatch.params.id) : null

    // RETURN
    return ( 
        <div className="container">
            <Navigation />
            <h1>Blogs</h1>
            <Notification />
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/signup" element={<UserForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/users" element={<Users users={users}/>} />
                <Route path="/users/:id" element={<User user={selectedUser} />} />
                <Route path='/blogs' element={<BlogList blogs={blogs}/>} />
                <Route path='/blogs/:id' element={<Blog blog={selectedBlog}/>} />
            </Routes>
        </div>
    )
}

export default App