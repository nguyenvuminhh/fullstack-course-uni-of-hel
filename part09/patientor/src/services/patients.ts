import axios from "axios";
import { Diagnoses, Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}patients`
  );

  return data;
};

const getAllDiagnoses = async () => {
  const { data } = await axios.get<Diagnoses[]>(
    `${apiBaseUrl}diagnoses`
  );

  return data;
};

const getPatientById = async (id: string | undefined) => {
  if (!id) return null;
  const res = await axios.get<Patient>(apiBaseUrl + 'patients/' + id);
  return res.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}patients`,
    object
  );

  return data;
};

const createNewEntry = async (object: NewEntry, id: string) => {
  const res = await axios.post<Entry>(apiBaseUrl + 'patients/' + id, object);
  return res.data;
};

export default {
  getAll, create, getPatientById, getAllDiagnoses, createNewEntry
};

