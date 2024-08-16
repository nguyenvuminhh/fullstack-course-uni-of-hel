import { Typography } from "@mui/material";
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Gender, Patient } from "../../types";
import EntryView from "./EntryView";
import EntryForm from "../EntryForm/EntryForm";
import { useState } from "react";

interface Props {
    patient: Patient | null,
    setPatient: (a: Patient) => void,
    notify: (a: string) => void
}

const PatientView = (props: Props) => {
    const [show, setShow] = useState<boolean>(false);
    if (!props.patient) {
        return (<Typography variant="h3">No patient found</Typography>);
    }
    let GenderIcon = TransgenderIcon;
    switch (props.patient.gender) {
        case (Gender.Female):
            GenderIcon = FemaleIcon;
            break;
        case (Gender.Male):
            GenderIcon = MaleIcon;
            break;
    }
    
    return (
        <div>
            <br/>
            <Typography variant="h3">{props.patient.name} <GenderIcon/></Typography>
            <Typography variant="body1">ssn: {props.patient.ssn ? props.patient.ssn : 'No ssn'}</Typography>
            <Typography variant="body1">occupation: {props.patient.occupation}</Typography>
            <br/>
            <Typography variant="h4">Entries: </Typography>
            {props.patient.entries.map(entry => <EntryView key={entry.id} entry={entry} />)}
            <br/>
            <EntryForm notify={props.notify} patient={props.patient} setPatient={props.setPatient} id={props.patient.id} key={props.patient.id} show={show} setShow={setShow} />
        </div>
    );
};

export default PatientView;