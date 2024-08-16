import { CoursePart } from "../types"
import { assertNever } from "../helper"

interface PartProps{
    part: CoursePart
}

const Part = (props: PartProps): JSX.Element => {
    switch (props.part.kind) {
        case 'basic':
            return (
                <div key={props.part.name}>
                    <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
                    <p><i>{props.part.description}</i></p>
                    <br/>
                </div>
            );
        case 'group':
            return (
                <div key={props.part.name}>
                    <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
                    <p><i>project exercises: {props.part.groupProjectCount}</i></p>
                    <br/>
                </div>
            );
        case 'background':
            return (
                <div key={props.part.name}>
                    <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
                    <p><i>{props.part.description}</i></p>
                    <p>background material {props.part.backgroundMaterial}</p>
                    <br/>
                </div>
            );
        case 'special':
            return (
                <div key={props.part.name}>
                    <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
                    <p><i>{props.part.description}</i></p>
                    <p>
                        required skill: {props.part.requirements.join(', ')}
                    </p>
                    <br/>
                </div>
            )
        default:
            return assertNever(props.part);
    }
}

export default Part