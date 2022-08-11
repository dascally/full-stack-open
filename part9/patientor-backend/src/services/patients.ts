import { randomUUID } from 'crypto';
import type { NewPatientData, Patient, PublicPatient } from '../types.js';
import patients from '../data/patients.js';

export function getPatients(): Array<PublicPatient> {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export function getPatient(patientId: string): Patient {
  const patient = patients.find((patient) => patient.id === patientId);
  if (patient === undefined) {
    throw new Error('A patient with that ID could not be found.');
  }
  return patient;
}

export function addPatient(patientData: NewPatientData): Patient {
  const { name, dateOfBirth, ssn, gender, occupation } = patientData;
  const newPatient: Patient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: [],
    id: randomUUID(),
  };

  patients.push(newPatient);
  return newPatient;
}
