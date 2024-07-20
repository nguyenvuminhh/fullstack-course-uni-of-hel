import { useState } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {

    const [visibility, setVisibility] = useState(false)
    const toggleVisibility = () => setVisibility(!visibility)

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    if (visibility) {
        return (
            <div>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        )
    }
    return (
        <button onClick={toggleVisibility}>{props.text}</button>
    )
})

Togglable.propTypes = {
    text: PropTypes.string.isRequired
}

export default Togglable