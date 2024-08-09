const Notification = (props) => {
    if (!props.message) {
        return null
    }

    return (
        <div>
            <p>{props.message}</p>
        </div>
    )
}

export default Notification