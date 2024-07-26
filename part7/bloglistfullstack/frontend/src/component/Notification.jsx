import { Alert } from "react-bootstrap"
import { useNoti } from "../reducecontext/notiContext"
import { useEffect } from "react"

const Notification = () => {
    const noti = useNoti()
    if (!noti) {
        return null
    }
  
    return (
        <Alert variant={noti.variant}>{noti.message}</Alert>
    )
}

export default Notification