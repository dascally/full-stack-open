import { Entry, Gender, NewPatientData } from './types.js';

function isGender(gender: unknown): gender is Gender {
  return Object.values(Gender as object).includes(gender);
}

function isDateOfBirth(dateOfBirth: string): boolean {
  return /^\d{4}([-/])\d{2}\1\d{2}$/.test(dateOfBirth);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatePatientData(patientData: any): NewPatientData {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = patientData;

  if (typeof name !== 'string') {
    throw new Error('Provided patient name is invalid.');
  }
  if (typeof dateOfBirth !== 'string' || !isDateOfBirth(dateOfBirth)) {
    throw new Error('Provided patient date of birth is invalid.');
  }
  if (typeof ssn !== 'string') {
    throw new Error('Provided patient SSN is invalid.');
  }
  if (!isGender(gender)) {
    throw new Error('Provided patient gender is invalid.');
  }
  if (typeof occupation !== 'string') {
    throw new Error('Provided patient occupation is invalid.');
  }

  // TODO: Validate entries properly
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const entries: Entry[] = patientData.entries ?? [];

  const newPatient: NewPatientData = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries,
  };

  return newPatient;
}
