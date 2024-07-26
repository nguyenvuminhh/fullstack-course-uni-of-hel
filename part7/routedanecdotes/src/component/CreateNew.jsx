import { useState } from "react"
import useField from "../hook/useField"

const CreateNew = (props) => {
    const authorField = useField('author')
    const contentField = useField('content')
    const infoField = useField('info')
  
    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        props.concatAnecdote(anecdote)
      }
  
    const reset = () => {
        authorField.reset()
        contentField.reset()
        infoField.reset()
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: contentField.value,
        author: authorField.value,
        info: infoField.value,
        votes: 0
      })
      props.notify(`A new anecdote \'${contentField.value}\' is created!`)
      reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...contentField} reset="" />
          </div>
          <div>
            author
            <input {...authorField} reset="" />
          </div>
          <div>
            url for more info
            <input {...infoField} reset="" />
          </div>
          <button type="submit">create</button>
          <button type="button" onClick={reset}>reset</button>
        </form>
      </div>
    )
  
  }

export default CreateNew