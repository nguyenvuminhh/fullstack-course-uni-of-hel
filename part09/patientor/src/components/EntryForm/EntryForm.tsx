import { Button, FormGroup, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import patients from "../../services/patients";
import SpecialAttribute from "./SpecialAttribute";
import { Patient } from "../../types";
import { AxiosError } from "axios";

interface Props {
    id: string,
    show: boolean,
    setShow: (a: boolean) => void,
    setPatient: (a: Patient) => void,
    patient: Patient,
    notify: (a: string) => void
}

const EntryForm = (props: Props) => {
    const useField = (type: string) => {
        const defaultValue = type === 'date' ? new Date().toISOString().split('T')[0] : '';
        const [value, setValue] = useState<string>(defaultValue);
        const onChange = (event: React.SyntheticEvent) => {
            event.preventDefault();
            if ('value' in event.target) {
                setValue(event.target.value as string);
            }
        };
        const reset = () => {
            setValue(defaultValue);
            return 0;
        };
        return {
            field: {value, onChange, type}, reset
        };
    };
    const [type, setType] = useState<string>("Hospital");
    const typeOnChange = (event: React.SyntheticEvent) => {
        if ('value' in event.target) {
            setType(event.target.value as string);
        }
    };

    const dateField = useField('date');
    const specialistField = useField('text');
    const descriptionField = useField('text');
    const codeField = useField('text');
    const employerNameField = useField('text');
    const sickLeaveStartField = useField('date');
    const sickLeaveEndField = useField('date');
    const dischargeDateField = useField('date');
    const dischargeCriteriaField = useField('text');
    const healthCheckRatingField = useField('text');

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const date = dateField.field.value;
        const specialist = specialistField.field.value;
        const description = descriptionField.field.value;
        const code = codeField.field.value;
        const employerName = employerNameField.field.value;
        const sickLeaveStart = sickLeaveStartField.field.value;
        const sickLeaveEnd = sickLeaveEndField.field.value;
        const dischargeDate = dischargeDateField.field.value;
        const dischargeCriteria = dischargeCriteriaField.field.value;
        const healthCheckRating = healthCheckRatingField.field.value;
        try {
            const result = await patients.createNewEntry({type, date, specialist, description, code, employerName, sickLeaveStart, sickLeaveEnd, dischargeCriteria, dischargeDate, healthCheckRating}, props.id);
            const newnew: Patient = {...props.patient, entries: [...props.patient.entries.concat(result)]};
            props.setPatient(newnew);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(214);
                props.notify(error.response?.data.error);
            }
        }
        dateField.reset();
        specialistField.reset();
        descriptionField.reset();
        codeField.reset();
        employerNameField.reset();
        sickLeaveStartField.reset();
        sickLeaveEndField.reset();
        dischargeDateField.reset();
        dischargeCriteriaField.reset();
        healthCheckRatingField.reset();
        props.setShow(false);
    };

    if (!props.show) {
        return <Button variant='contained' onClick={() => props.setShow(true)}>Add new entry</Button>;
    }

    return (
        <form onSubmit={onSubmit}>
            <RadioGroup value={type} onChange={typeOnChange} defaultValue={"Hospital"}>
                <FormLabel>Entry type: </FormLabel>
                <FormControlLabel value="Hospital" label="Hospital" control={<Radio />} />
                <FormControlLabel value="OccupationalHealthcare" label="OccupationalHealthcare" control={<Radio />} />
                <FormControlLabel value="HealthCheck" label="HealthCheck" control={<Radio />} />
            </RadioGroup>
            <FormGroup>
                <FormLabel>Date: </FormLabel>
                <TextField required {...dateField.field} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Specialist: </FormLabel>
                <TextField required {...specialistField.field} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Description: </FormLabel>
                <TextField required {...descriptionField.field} />
            </FormGroup>
            <SpecialAttribute 
                type={type} 
                codeField={codeField.field} 
                dischargeDateField = {dischargeDateField.field}
                dischargeCriteriaField = {dischargeCriteriaField.field}
                healthCheckRatingField = {healthCheckRatingField.field}
                employerNameField = {employerNameField.field}
                sickLeaveEndField = {sickLeaveEndField.field}
                sickLeaveStartField = {sickLeaveStartField.field}
                setShow = {props.setShow}
            />
        </form>
    );
};

export default EntryForm;