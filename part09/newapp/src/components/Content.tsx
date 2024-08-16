import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
    coursePart: CoursePart[]
}


const Content = (props: ContentProps): JSX.Element => {
    return (
        <>
            {props.coursePart.map(part => <Part part={part} key={part.name} />)}
        </>
    );
};

export default Content