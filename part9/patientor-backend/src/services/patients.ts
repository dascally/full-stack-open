import { randomUUID } from 'crypto';
import type {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  NewPatientData,
  OccupationalHealthcareEntry,
  PartialEntry,
  Patient,
  PublicPatient,
} from '../types.js';
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

export function addPatientsEntry(
  patientId: string,
  entryData: Omit<Entry, 'id'>
): Entry {
  const patient = patients.find((patient) => patient.id === patientId);
  if (patient === undefined) {
    throw new Error('A patient with that ID could not be found.');
  }

  const newEntry: PartialEntry = {
    id: randomUUID(),
    type: entryData.type,
    description: entryData.description,
    date: entryData.date,
    specialist: entryData.specialist,
  };
  if (entryData.diagnosisCodes) {
    newEntry.diagnosisCodes = entryData.diagnosisCodes;
  }

  switch (entryData.type) {
    case 'HealthCheck':
      newEntry.healthCheckRating = (
        entryData as HealthCheckEntry
      ).healthCheckRating;
      break;
    case 'Hospital':
      newEntry.discharge = {
        date: (entryData as HospitalEntry).discharge.date,
        criteria: (entryData as HospitalEntry).discharge.criteria,
      };
      break;
    case 'OccupationalHealthcare':
      newEntry.employerName = (
        entryData as OccupationalHealthcareEntry
      ).employerName;
      if ('sickLeave' in entryData) {
        newEntry.sickLeave = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          startDate: (entryData as OccupationalHealthcareEntry).sickLeave!
            .startDate,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          endDate: (entryData as OccupationalHealthcareEntry).sickLeave!
            .endDate,
        };
      }
      break;
  }

  patient.entries.push(newEntry as Entry);
  return newEntry as Entry;
}
