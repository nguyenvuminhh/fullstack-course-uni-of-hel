import { FormGroup, FormLabel, TextField, ButtonGroup, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props{
    type: string,
    codeField: object,
    dischargeDateField: object, 
    dischargeCriteriaField: object,  
    healthCheckRatingField: object, 
    employerNameField: object, 
    sickLeaveEndField: object, 
    sickLeaveStartField: object, 
    setShow: (a: boolean) => void
}

const SpecialAttribute = ({type, codeField, dischargeDateField, dischargeCriteriaField, healthCheckRatingField, employerNameField, sickLeaveEndField, sickLeaveStartField, setShow}: Props) => {
    if (type === 'Hospital') {
        return (
            <>
                <FormGroup>
                    <FormLabel>Diagnoses codes: </FormLabel>
                    <TextField required {...codeField} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Discharged date: </FormLabel>
                    <TextField required {...dischargeDateField} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Discharged criteria: </FormLabel>
                    <TextField required {...dischargeCriteriaField} />
                </FormGroup>
                <br />
                <ButtonGroup>
                    <Button variant='contained' type='submit'>Submit</Button>
                    <Button variant='outlined' type='button' onClick={() => setShow(false)}>Cancel</Button>
                </ButtonGroup>
            </>
        );
    } else if (type === 'HealthCheck') {
        return (
            <>
                <RadioGroup {...healthCheckRatingField} defaultValue={""}>
                    <FormLabel>Entry type: </FormLabel>
                    <FormControlLabel value="" label="No rating" control={<Radio />} />
                    <FormControlLabel value='0' label="0" control={<Radio />} />
                    <FormControlLabel value='1' label="1" control={<Radio />} />
                    <FormControlLabel value='2' label="2" control={<Radio />} />
                    <FormControlLabel value='3' label="3" control={<Radio />} /> 
                </RadioGroup>
                <br />
                <ButtonGroup>
                    <Button variant='contained' type='submit'>Submit</Button>
                    <Button variant='outlined' type='button' onClick={() => setShow(false)}>Cancel</Button>
                </ButtonGroup>

            </>
        );
    } else if (type === 'OccupationalHealthcare') {
        return (
            <>
                <FormGroup>
                    <FormLabel>Diagnoses codes: </FormLabel>
                    <TextField {...codeField} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Employee name: </FormLabel>
                    <TextField required {...employerNameField} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Sick leave start: </FormLabel>
                    <TextField {...sickLeaveStartField} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Sick leave end: </FormLabel>
                    <TextField {...sickLeaveEndField} />
                </FormGroup>
                <br />
                <ButtonGroup>
                    <Button variant='contained' type='submit'>Submit</Button>
                    <Button variant='outlined' type='button' onClick={() => setShow(false)}>Cancel</Button>
                </ButtonGroup>
            </>
        );
    }
};

export default SpecialAttribute;