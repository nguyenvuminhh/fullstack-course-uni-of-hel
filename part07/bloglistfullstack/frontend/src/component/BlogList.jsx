import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import blogService from "../service/blogService"
import { useEffect } from "react"
import { useUser } from "../reducecontext/userContext"
import { Link } from "react-router-dom"
import BlogForm from "./BlogForm"

const BlogList = ({ blogs }) => {
    return (
        <div>
            <BlogForm />
            <ul>
                {blogs.map(a => (
                    <li key={a.id}><Link to={'/blogs/'+a.id}>{a.title}</Link></li>
                ))}
            </ul>
        </div>  
      )      
}

export default BlogList