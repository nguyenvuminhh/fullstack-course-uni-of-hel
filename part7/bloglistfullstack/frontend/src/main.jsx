import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserContextProvider } from './reducecontext/userContext.jsx'
import { NotiContextProvider } from './reducecontext/notiContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <NotiContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </QueryClientProvider>
      </UserContextProvider>
    </NotiContextProvider>
  </Router>,
)
