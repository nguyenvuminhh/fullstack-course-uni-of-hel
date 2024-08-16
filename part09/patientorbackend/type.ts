type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
};

export interface EntryBase {
    id: string,
    date: string,
    specialist: string,
    description: string
}

export interface OccupationalHealthcareEntry extends EntryBase {
    type: 'OccupationalHealthcare',
    diagnosesCodes?: Array<Diagnoses['code']>,
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

export interface HospitalEntry extends EntryBase {
    type: 'Hospital',
    diagnosesCodes: Array<Diagnoses['code']>,
    discharge: {
        date: string,
        criteria: string,
    },
}

export interface HealthCheckEntry extends EntryBase {
    type: 'HealthCheck',
    healthCheckRating?: number
}

export type Entry = | HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry

export type NewEntry = UnionOmit<Entry, 'id'>

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries?: Entry[]
}

export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;

