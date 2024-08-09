import Select from "react-select"
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useState } from "react"

const SetBorn = (props) => {
    const client = useApolloClient()

    const authors = client.readQuery({ query: ALL_AUTHORS})
    const [updateAuthor] = useMutation(UPDATE_AUTHOR,{ refetchQueries: [{ query: ALL_AUTHORS }] })
    const yearLessAuthors = authors.allAuthors.filter(a => !a.born).map(a => a.name)
    const option = yearLessAuthors.map(a => ({ value: a, label: a}))

    const [value, setValue] = useState(null)
    const onChangeSelect = (value) => {
        setValue(value)
    }
    
    const [year, setYear] = useState('')
    const onChangeInput = (event) => {
        setYear(Number(event.target.value))
    }
    const onSubmit = (event) => {
        event.preventDefault()
        updateAuthor({ variables: { name:value.value, year: Number(year) }, onError: (error) => {
            const message = error.graphQLErrors.map(e => e.message).join('\n')
            props.notify(message)
        } })
        setValue(null)
        setYear('')
    }

    return(
        <div>
            <Select
                value={value}
                options={option}
                onChange={onChangeSelect}
            />
            <form onSubmit={onSubmit}>
                year: <input value={year} type='number' onChange={onChangeInput}/>
                <button type="submit">update</button>
            </form>
        </div>
    )
}

export default SetBorn