import { List, ListItem, Typography } from "@mui/material";
import { Diagnoses, HospitalEntry } from "../../types";
import {Box} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useState, useEffect } from "react";
import patients from "../../services/patients";

interface Props {
    entry: HospitalEntry
}

const HospitalEntryView = (props: Props) => {
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
            <Typography variant="body1" >{props.entry.date} <LocalHospitalIcon /> </Typography>
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
            <Typography variant="body1">
                Discharged at {props.entry.discharge.date}: {props.entry.discharge.criteria}
            </Typography>

        </Box>
    );
};

export default HospitalEntryView;