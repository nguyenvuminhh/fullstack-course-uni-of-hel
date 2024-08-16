import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const Login = (props) => {
    const [username, setUsername] = useState('')
    const usernameOnChange = (event) => setUsername(event.target.value)
    const [password, setPassword] = useState('')
    const passwordOnChange = (event) => setPassword(event.target.value)
    const [login, result] = useMutation(LOGIN)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const handleLogin = async (event) => {
        event.preventDefault()
        await login({variables: {username, password}, onError: (error) => {
            const message = error.graphQLErrors.map(e => e.message).join('\n')
            props.notify(message)
        }})
        setUsername('')
        setPassword('')
    }
    const handleLogout = () => {
        localStorage.clear()
        setToken('')
    }
    useEffect(() => {
        if (result.data) {
            localStorage.setItem('token', result.data.login.value)
            setToken(result.data.login.value)
        }
    }, [result.data])

    if (!props.show) {
        return null
    }
    if (token) {
        return (
            <button onClick={handleLogout}>log out</button>
        )
    }
    return (
        <div>
            <h2>login</h2>
            <form onSubmit={handleLogin}>
                username:<input type='text' value={username} onChange={usernameOnChange}></input>
                <br/>
                password:<input type='password' value={password} onChange={passwordOnChange}></input>
                <br/>
                <button type='submit'>log in</button>
            </form>
        </div>
    )
}

export default Login