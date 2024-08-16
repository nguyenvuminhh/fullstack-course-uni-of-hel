import { Button, Form } from "react-bootstrap"
import useField from "../hooks/useField"
import { useUser } from "../reducecontext/userContext"
import blogService from "../service/blogService"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from "react"
import { useNotiDispatch, useAnnoucementAlert, useErrorAlert } from "../reducecontext/notiContext"
import userService from "../service/userService"

const UserForm = () => {    
    // HOOKS
    const nameField = useField('namez')
    const usernameField = useField('username')
    const passwordField = useField('password')
    const queryClient = useQueryClient()
    const notiDispatch = useNotiDispatch()
    const announcementAlert = useAnnoucementAlert(notiDispatch)
    const errorAlert = useErrorAlert(notiDispatch)

    // HANDLE NEW BLOG
    const newUserMutation = useMutation({
        mutationKey: ['signUp'],
        mutationFn: userService.createAccount,
        onSuccess: (newUser) => {
            const users = queryClient.getQueryData(['fetchUser'])
            queryClient.setQueryData(['fetchUser'], users.concat(newUser))
            const message = `You have created an account`
            announcementAlert(message)
        },
        onError: (error) => {errorAlert(error.response.data.error)}
    })
    const onSubmit = async (event) => {
        event.preventDefault()
        const newUser = {
            name: nameField.value,
            username: usernameField.value,
            password: passwordField.value
        }
        newUserMutation.mutate(newUser)
        nameField.reset()
        usernameField.reset()
        passwordField.reset()
    }

    // RETURN
    return (
        <Form onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>name:</Form.Label>
                <Form.Control {...nameField} reset=''></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>username:</Form.Label>
                <Form.Control {...usernameField} reset=''></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>password:</Form.Label>
                <Form.Control {...passwordField} reset=''></Form.Control>
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">Sign up</Button>
        </Form>
    )
}

export default UserForm