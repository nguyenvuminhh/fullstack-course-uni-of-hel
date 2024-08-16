import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch, useLocation } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientView from "./components/PatientView/PatientView";
import Notification from "./components/Notification";

const App = () => {
  const [noti, setNoti] = useState<string | null>(null);
  const notify = (message: string) => {
    console.log(12345);
    setNoti(message);
    setTimeout(() => setNoti(null), 5000);
  };
  const [patients, setPatients] = useState<Patient[]>([]);
  const match = useMatch('/:id');
  const [patient, setPatient] = useState<Patient | null>(null);
  const locationHook = useLocation();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      (patients);
      setPatients(patients);
    };
    void fetchPatientList();
    const patientId = match ? match.params.id : undefined;
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(patientId);
      setPatient(patient);
    };
    void fetchPatient();
    
  }, [locationHook.pathname, match]);
  
  return (
        <Container>
          <Notification noti={noti} />
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/:id" element={<PatientView notify={notify} patient={patient} setPatient={setPatient} />} />
          </Routes>
        </Container>
  );
};

export default App;
