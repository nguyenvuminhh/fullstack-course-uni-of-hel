import { createContext, useContext, useReducer } from "react"

const notiReducer = (state, action) => {
    if (action.type === 'NOTIFY') {
        return action.payload
    } else if (action.type === 'CLEAR') {
        return ''
    } else {
        return state
    }
}

export const NotiContext = createContext()

export const NotiContextProvider = (props) => {
    const [noti, notiDispatch] = useReducer(notiReducer, '')
    return (
        <NotiContext.Provider value={[noti, notiDispatch]}>
            {props.children}
        </NotiContext.Provider>
    )
}

export const useNotiValue = () => {
    const [noti, notiDispatch] = useContext(NotiContext)
    return noti
}

export const useNotiDispatch = () => {
    const [noti, notiDispatch] = useContext(NotiContext)
    return notiDispatch
}

export const useNotify = (dispatch) => {
    const notify = (message) => {
        dispatch({type: 'NOTIFY', payload: message})
        setTimeout(() => {
            dispatch({type: 'CLEAR'})
        }, 5000)
    }
    return notify
}