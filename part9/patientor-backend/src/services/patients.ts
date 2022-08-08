import { randomUUID } from 'crypto';
import type {
  NewPatientData,
  Patient,
  PatientMinusSensitiveInfo,
} from '../types.js';
import patients from '../data/patients.js';

export function getPatients(): Array<PatientMinusSensitiveInfo> {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export function addPatient(patientData: NewPatientData): Patient {
  const { name, dateOfBirth, ssn, gender, occupation } = patientData;
  const newPatient: Patient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    id: randomUUID(),
  };

  patients.push(newPatient);
  return newPatient;
}
