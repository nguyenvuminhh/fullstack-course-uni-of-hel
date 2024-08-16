export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


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

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export type HospitalEntryNew = Omit<HospitalEntry, 'id'>;
export type HealthCheckEntryNew = Omit<HealthCheckEntry, 'id'>;
export type OccupationalHealthcareEntryNew = Omit<OccupationalHealthcareEntry, 'id'>;

export interface NewEntry {
    type: string,
    date: string, 
    specialist: string, 
    description: string, 
    code: string, 
    employerName: string, 
    sickLeaveStart: string, 
    sickLeaveEnd: string, 
    dischargeDate: string, 
    dischargeCriteria: string, 
    healthCheckRating: string, 
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;