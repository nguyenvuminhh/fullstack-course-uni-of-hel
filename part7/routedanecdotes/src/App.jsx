import { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Link, Routes, Route, useMatch } from 'react-router-dom'
import Menu from './component/Menu'
import AnecdoteList from './component/AnecdoteList'
import About from './component/About'
import Footer from './component/Footer'
import CreateNew from './component/CreateNew'
import Anecdote from './component/Anecdote'
import Notification from './component/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const concatAnecdote = (newAnecdote) => {
    setAnecdotes(anecdotes.concat(newAnecdote))
    
  }
  console.log(anecdotes)

  const match = useMatch('/anecdotes/:id')
  
  const anecdoteById = (id) => anecdotes.find(a => a.id === Number(id))

  const anecdote = (match !== null) ? anecdoteById(match.params.id) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const notiRef = useRef()

  const notify = (message) => {
    notiRef.current.notify(message)
  }


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification ref={notiRef}/>
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote {...anecdote} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/createNew' element={<CreateNew notify={notify} concatAnecdote={concatAnecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
