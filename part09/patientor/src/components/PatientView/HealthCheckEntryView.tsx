import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../types";
import {Box} from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HealthRatingBar from "../HealthRatingBar";


interface Props {
    entry: HealthCheckEntry
}

const HealthCheckEntryView = (props: Props) => {
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="body1" >{props.entry.date} <MonitorHeartIcon /> </Typography>
            <Typography variant="body1" >{props.entry.description}</Typography>
            <Typography variant="body1" >Diagnosed by {props.entry.specialist}</Typography>
            { props.entry.healthCheckRating ? 
                <HealthRatingBar showText={false} rating={4-props.entry.healthCheckRating} />
            : null}
        </Box>
    );
};

export default HealthCheckEntryView;