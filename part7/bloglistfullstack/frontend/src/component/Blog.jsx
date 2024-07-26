import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useUser } from "../reducecontext/userContext"
import blogService from "../service/blogService"
import CommentForm from "./CommentForm"
import { useNotiDispatch, useAnnoucementAlert } from "../reducecontext/notiContext"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Blog = ({ blog }) => {
    // HOOKS
    const queryClient = useQueryClient()
    const user = useUser()
    const notiDispatch = useNotiDispatch()
    const announcementAlert = useAnnoucementAlert(notiDispatch)
    const navigate = useNavigate()

    // HANDLE LIKES
    const likeMutation = useMutation({
        mutationKey: ['like'],
        mutationFn: blogService.like,
        onSuccess: (updated) => {
            const blogs = queryClient.getQueryData(['fetchBlog'])
            queryClient.setQueryData(['fetchBlog'], blogs.map(a => a.id === updated.id ? updated : a))
            const message = `You have liked blog \'${updated.title}\'`
            announcementAlert(message)
        }
    })
    const handleLike = (event) => {
        const id = event.target.id.replace('like', '')
        likeMutation.mutate(id)
    }

    //HANDLE DELETE
    const deleteMutation = useMutation({
        mutationKey: ['delete'],
        mutationFn: blogService.deleteBlog,
        onSuccess: (deletedId) => {
            const blogs = queryClient.getQueryData(['fetchBlog'])
            queryClient.setQueryData(['fetchBlog'], blogs.filter(a => a.id !== deletedId))
            const message = 'You have deleted a blog'
            announcementAlert(message)
            navigate('/')
        },
        onError: (error) => {errorAlert(error.response.data.error)}
    })
    const handleDelete = (event) => {
        const id = event.target.id.replace('delete', '')
        const token = user.token
        deleteMutation.mutate({id, token})
    }

    // COMMENT COMPONENT
    const Comments = () => {
        if (blog.comments.length === 0) {
            return <p>No comments</p>
        }
        return (
            <ul>
                {blog.comments.map(a => (
                    <li key={Math.random()*18394}>{a}</li>
                ))}
            </ul>
        )
    }

    const DeleteButton = ({ blog }) => {
        if (!user){
            return null
        }
        if (blog.user.username !== user.username){
            return null
        }
        return (
            <Button variant='danger' id={'delete' + blog.id} onClick={handleDelete}>delete</Button>
        )
    }

    // RETURN 
    if (!blog.title) {
        return null
    }

    return (
        <div key={blog.id}>
              <h2>{ blog.title} { blog.author}</h2>
              <a href={ blog.url}>{ blog.url}</a>
              <p>
                {blog.likes}
                <Button variant='primary' id={'like' +  blog.id} onClick={handleLike}>like</Button>
              </p>
              <DeleteButton blog={blog} />
              <p>added by {blog.user.name}</p>
              <h3>comments</h3>
              <CommentForm id={'comment' + blog.id} />
              <Comments />
        </div>
    )
}

export default Blog