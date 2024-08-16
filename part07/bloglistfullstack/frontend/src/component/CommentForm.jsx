import { useMutation, useQueryClient } from "@tanstack/react-query"
import useField from "../hooks/useField"
import blogService from "../service/blogService"
import { Button, Form } from "react-bootstrap"

const CommentForm = ({ id }) => {
    // HOOKS 
    const queryClient = useQueryClient()
    const commentField = useField('comment')

    // HANDLE COMMENT
    const blogId = id.replace('comment', '')
    const commentMutation = useMutation({
        mutationKey: ['comment'],
        mutationFn: blogService.comment,
        onSuccess: (updated) => {
            const id = updated.id
            const blogs = queryClient.getQueryData(['fetchBlog'])
            queryClient.setQueryData(['fetchBlog'], blogs.map(a => a.id === id ? updated : a))
        }
    })
    const handleComment = (event) => {
        event.preventDefault()
        commentMutation.mutate({ id: blogId, comment: commentField.value })
        commentField.reset()
    }

    // RETURN
    return (
        <Form onSubmit={handleComment}>
            <Form.Group>
                <Form.Control {...commentField} reset=''></Form.Control>
            </Form.Group>
            <Button variant='primary' type="submit">add comment</Button>
        </Form>
    )
}

export default CommentForm