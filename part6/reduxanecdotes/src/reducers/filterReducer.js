import { createSlice } from '@reduxjs/toolkit'

const keywordSlice = createSlice({
    name: 'keyword',
    initialState: '',
    reducers: {
        find(state, action) {
            return action.payload
        }
    }
})

export const { find } = keywordSlice.actions

export default keywordSlice.reducer