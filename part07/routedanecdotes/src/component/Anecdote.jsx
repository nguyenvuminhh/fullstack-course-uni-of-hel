const Anecdote = (props) => {
    console.log(props)
    return (
        <div>
            <h2>{props.content}</h2>
            <p>has {props.votes} votes</p>
            <p>more info see <a href={props.info}>{props.info}</a></p>
        </div>
    )
}

export default Anecdote