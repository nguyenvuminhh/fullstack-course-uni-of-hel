import axios from "axios"

const baseURL = 'http://localhost:3003/api/login'

const loginWith = async ({password, username}) => {
    const res = await axios.post(baseURL, {password, username})
    return res.data
}

export default { loginWith }