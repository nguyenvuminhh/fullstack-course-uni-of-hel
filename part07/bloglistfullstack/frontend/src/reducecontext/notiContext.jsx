import { createContext, useContext, useReducer } from "react";

const NotiContext = createContext()
const notiReducer = (state, action) => {
    if (action.type === 'ANNOUCEMENT') {
        return {
            message: action.payload,
            variant: 'success'
        }
    } else if (action.type === 'ERROR') {
        return {
            message: action.payload,
            variant: 'danger'
        }
    } else if (action.type === 'CLEAR') {
        return null
    } else {
        return state
    }
}

export const NotiContextProvider = (props) => {
    const [noti, notiDispatch] = useReducer(notiReducer, null)
    return (
        <NotiContext.Provider value={[noti, notiDispatch]}>
            {props.children}
        </NotiContext.Provider>
    )
}

export const useNoti = () => useContext(NotiContext)[0]
export const useNotiDispatch = () => useContext(NotiContext)[1]

export const useErrorAlert = (dispatch) => {
    return (message) => {
        dispatch({type: 'ERROR', payload: message})
        setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
    }
}

export const useAnnoucementAlert = (dispatch) => {
    return (message) => {
        dispatch({type: 'ANNOUCEMENT', payload: message})
        setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
    }
}

export default NotiContext