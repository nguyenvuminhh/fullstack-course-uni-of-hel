import { forwardRef, useImperativeHandle } from "react"
import { useState } from "react"

const Notification = forwardRef((props, refs) => {
    const [notification, setNotification] = useState('')

    const notify = (message) => {
        setNotification(message)
        setTimeout(() => {setNotification('')}, 5000)
    }

    useImperativeHandle(refs, () => {
        return {
            notify
        }
    })

    if (!notification) {
        return null
    }
    return (
        <p>{notification}</p>
    )
})

export default Notification