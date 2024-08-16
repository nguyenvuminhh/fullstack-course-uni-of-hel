import { useState } from "react"
import RadioForm from "./RadioForm"
import { addNew } from "../service"

const isString = (a: unknown): a is string => {
    return (typeof a === 'string' || a instanceof String)
}

interface NewFlightFormProps {
    refetch: () => void
}

const NewFlightForm = (props: NewFlightFormProps) => {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [comment, setComment] = useState<string>('')

    const dateOnChange = (event: React.SyntheticEvent) => {
        if ('value' in event.target && isString(event.target.value)){
            setDate(event.target.value)
        }
    }

    const commentOnChange = (event: React.SyntheticEvent) => {
        if ('value' in event.target && isString(event.target.value)){
            setComment(event.target.value)
        }
    }

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        const weather = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="weather"')).find(a => a.checked)
        const visibility = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="visibility"')).find(a => a.checked)
        if ( !weather || !visibility ) {
            console.log("error")
            return
        }
        const data = { weather: weather.value, visibility: visibility.value, date, comment }
        console.log(data)
        try {
            await addNew(data)
            props.refetch()
            weather.checked = false
            visibility.checked = false
            setComment('')
            setDate(new Date().toISOString().split('T')[0])
        } catch (e) {
            console.log(e)
        }


    }
    return (
        <div>
            <h2>Add new flight</h2>
            <form onSubmit={onSubmit}>
                <p>Flight date:<input type="date" value={date} onChange={dateOnChange}/></p>
                <RadioForm name="Visibility" options={["great", "good", "ok", "poor"]} />
                <RadioForm name="Weather" options={["sunny", "rainy", "cloudy", "stormy", "windy"]} />
                <p>Comment <input type="text" value={comment} onChange={commentOnChange} /></p>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default NewFlightForm