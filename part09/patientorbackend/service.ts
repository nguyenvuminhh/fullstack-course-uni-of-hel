import { diagnosesData, patientData } from "./data";
import { Diagnoses, PatientNonSensitive, Patient, NewPatientEntry, NewEntry } from "./type";
import { genderParser } from "./util/typeGuard";
import { v1 as uuid } from 'uuid';


export const getDiagnoses = (): Diagnoses[] => {
    return diagnosesData
}

export const getPatientByID = (id: string): Patient | null => {
    const patient = patientData.find(a => a.id === id)
    if (patient) {
        return {...patient, gender: genderParser(patient.gender)}
    }
    return null
}

export const getPatientsNonSensitive = (): PatientNonSensitive[] => {
    const patients = patientData
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender: genderParser(gender), occupation }))
}

export const addPatient = (object: NewPatientEntry) => {
    const newPatient = {
        ...object,
        id: uuid()
    }
    patientData.push(newPatient)
    return newPatient
}

export const addEntry = (object: NewEntry | undefined, id: string) => {
    if (object !== undefined){
        const result = {...object, id: uuid()}
        const patient = patientData.find(a => a.id === id)
        patient?.entries?.push(result)
        return result
    }
    return null
}
