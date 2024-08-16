import { DiaryEntry } from "../types";

interface FlightListProps{
    list: DiaryEntry[]
}


const FlightList = (props: FlightListProps) => {
    console.log(props.list);
    return (
        props.list.map(flight => (
            <div key={flight.id}>
                <h2>{flight.date}</h2>
                <p>visibility: {flight.visibility}</p>
                <p>weather: {flight.weather}</p>
                {flight.comment ? <p>comment: {flight.comment}</p> : null}
            </div>
        ))
    );
};

export default FlightList;