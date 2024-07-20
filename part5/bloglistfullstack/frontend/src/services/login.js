import axios from 'axios'

const login = async (username, password) => {
    return await axios.post('/api/login', { username, password })
}

export default { login }