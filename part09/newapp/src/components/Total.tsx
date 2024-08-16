interface TotalProps{
    total: number
}

const Total = (props: TotalProps): JSX.Element => {
    return (
        <div>
            <p>Total exercise: {props.total}</p>
        </div>
    )
}

export default Total