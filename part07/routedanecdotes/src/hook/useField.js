import { useState } from "react"

const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
        return 0
    }
    
    return {
        value, onChange, type, reset
    }
}

export default useField