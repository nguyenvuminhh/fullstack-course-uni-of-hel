import { Alert } from "@mui/material";

interface Props {
    noti: string | null
}

const Notification = (props: Props) => {
    if (!props.noti) {
        return null;
    }
    return (
        <Alert severity="error">{props.noti}</Alert>
    );
};

export default Notification;