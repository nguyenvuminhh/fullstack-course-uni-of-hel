import axios from "axios"

const baseURL = 'http://localhost:3003/api/users'

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const createAccount = async (newUser) => {
    const res = await axios.post(baseURL, newUser)
    return res.data
}

export default { getAll, createAccount }