import { createSlice } from '@reduxjs/toolkit'

const notiSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify(state, action) {
            return action.payload
        }
    }
})

export const { notify } = notiSlice.actions
export const setNoti = (message, time) => {
    return async (dispatch) => {
        dispatch(notify(message))
        setTimeout(() => {dispatch(notify(''))}, time*1000)
    }
}

export default notiSlice.reducer
