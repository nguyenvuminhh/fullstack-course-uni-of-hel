interface RadioFormProps {
    options: string[],
    name: string
}

const RadioForm = (props: RadioFormProps) => {
    return (
        <p>
            {props.name}: {props.options.map(option => <span key={option} >{option}:<input type="radio" value={option} name={props.name.toLowerCase()}/> </span>)}
        </p>
    );
};

export default RadioForm;