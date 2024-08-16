import { List, ListItem, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../types";
import {Box} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import patients from "../../services/patients";
import { Diagnoses } from "../../types";
import { useEffect, useState } from "react";

interface Props {
    entry: OccupationalHealthcareEntry
}

const OccupationalHealthcareEntryView = (props: Props) => {

    const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const result = await patients.getAllDiagnoses();
            setDiagnoses(result);
        };
        void fetch();
    }, []);
    
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="body1" >{props.entry.date} <WorkIcon /> {props.entry.employerName}</Typography>
            <Typography variant="body1" >{props.entry.description}</Typography>
            <Typography variant="body1" >Diagnosed by {props.entry.specialist}</Typography>

            {props.entry.diagnosesCodes ? 
                <List>
                    {props.entry.diagnosesCodes.map(code => (
                        <ListItem key={code}>
                            {code}: {diagnoses.find(a => a.code === code)?.name}
                        </ListItem>
                    ))}
                </List> 
            : null}
            {props.entry.sickLeave ?
                <Typography variant="body1">
                    Sick leave from {props.entry.sickLeave.startDate} to {props.entry.sickLeave.endDate}
                </Typography>
            : null}
        </Box>
    );
};

export default OccupationalHealthcareEntryView;