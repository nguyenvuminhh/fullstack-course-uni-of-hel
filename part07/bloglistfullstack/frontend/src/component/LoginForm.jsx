import { Button, Form } from "react-bootstrap"
import useField from "../hooks/useField"
import { useUser, useUserDispatch } from "../reducecontext/userContext"
import loginService from "../service/loginService"
import { useErrorAlert, useNotiDispatch } from "../reducecontext/notiContext"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    // HOOKS
    const userNameField = useField('username')
    const passwordField = useField('password')
    const userDispatch = useUserDispatch()
    const user = useUser()
    const notiDispatch = useNotiDispatch()
    const errorAlert = useErrorAlert(notiDispatch) 
    const navigate = useNavigate()

    // HANDLE LOGIN LOGOUT
    const handleLogin = async (event) => {
        event.preventDefault()
        const loginRes = await loginService.loginWith({username: userNameField.value, password: passwordField.value})
                                           .catch(error => errorAlert(error.response.data.error))
        console.log(loginRes)
        userDispatch({type: 'LOGIN', payload: loginRes})
        userNameField.reset()
        passwordField.reset()
        navigate('/')
    }
    const handleLogout = () => {
        userDispatch({type: 'LOGOUT'})
    }

    // RETURN
    if (user) {
        return (
            <div>
                <p>{user.name} has logged in</p>
                <Button variant='danger' onClick={handleLogout}>logout</Button>
            </div>
        )
    }
    
    return (
        <Form onSubmit={handleLogin}>
            <Form.Group>
                <Form.Label>username:</Form.Label>
                <Form.Control {...userNameField} reset=''/>
            </Form.Group>
            <Form.Group>
                <Form.Label>password:</Form.Label>
                <Form.Control {...passwordField} reset=''/>
            </Form.Group>
            <Button variant='primary' type="submit">log in</Button>
        </Form>
    )
}

export default LoginForm