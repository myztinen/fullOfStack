import patientData from "../../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: String(uuidv4()),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  addPatient,
  findById
};
