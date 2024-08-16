import { assertNever } from "../../constants";
import { Entry } from "../../types";
import HealthCheckEntryView from "./HealthCheckEntryView";
import HospitalEntryView from "./HospitalEntryView";
import OccupationalHealthcareEntryView from "./OccupationalHealthcareEntryView";

interface Props {
    entry: Entry
}

const EntryView = (props: Props) => {
    switch (props.entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntryView entry={props.entry}/>;
        case 'Hospital':
            return <HospitalEntryView entry={props.entry}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntryView entry={props.entry}/>;
        default:
            assertNever(props.entry);
    }
};

export default EntryView;