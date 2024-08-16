import { configureStore } from '@reduxjs/toolkit'
import notiReducer from './reducers/notiReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer:{
        keyword: filterReducer,
        anecdotes: anecdoteReducer,
        notification: notiReducer
    }
})

export default store