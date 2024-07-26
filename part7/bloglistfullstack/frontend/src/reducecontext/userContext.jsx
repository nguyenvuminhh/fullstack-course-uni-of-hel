import { createContext, useContext, useReducer } from "react"

const userReducer = (state, action) => {
    if (action.type === 'LOGIN') {
        return action.payload
    } else if (action.type === 'LOGOUT') {
        return null
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)
    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)[0]
export const useUserDispatch = () => useContext(UserContext)[1]

export default UserContext