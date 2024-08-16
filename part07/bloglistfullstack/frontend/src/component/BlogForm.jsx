import { Button, Form } from "react-bootstrap"
import useField from "../hooks/useField"
import { useUser } from "../reducecontext/userContext"
import blogService from "../service/blogService"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react"
import { useNotiDispatch, useAnnoucementAlert } from "../reducecontext/notiContext"

const BlogForm = () => {
    // VISIBILITY
    const [visibility, setVisibility] = useState(false)
    const toggleVisibility = () => setVisibility(!visibility)
    
    // HOOKS
    const authorField = useField('author')
    const titleField = useField('title')
    const urlField = useField('url')
    const user = useUser()
    const queryClient = useQueryClient()
    const notiDispatch = useNotiDispatch()
    const announcementAlert = useAnnoucementAlert(notiDispatch)

    // HANDLE NEW BLOG
    const newBlogMutation = useMutation({
        mutationKey: ['createNew'],
        mutationFn: blogService.createNew,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['fetchBlog'])
            queryClient.setQueryData(['fetchBlog'], blogs.concat(newBlog))
            toggleVisibility()
            const message = `You have added blog ${newBlog.title}`
            announcementAlert(message)
        }
    })
    const onSubmit = async (event) => {
        event.preventDefault()
        const newBlog = {
            author: authorField.value,
            title: titleField.value,
            url: urlField.value,
            likes: 0
        }
        const token = user.token
        newBlogMutation.mutate({ newBlog, token })
        authorField.reset()
        titleField.reset()
        urlField.reset()
    }

    // RETURN
    if (!visibility) {
        return <div><Button variant='primary' onClick={toggleVisibility}>createNew</Button></div>
    }

    if (!user) {
        return <div><h4>You must login to create blog</h4></div>
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>author:</Form.Label>
                <Form.Control {...authorField} reset=''></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control {...titleField} reset=''></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>url:</Form.Label>
                <Form.Control {...urlField} reset=''></Form.Control>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">Create</Button>
            <Button variant="secondary" onClick={toggleVisibility}>cancel</Button>
        </Form>
    )
}

export default BlogForm