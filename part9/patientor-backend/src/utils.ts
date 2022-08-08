import { NewPatientData } from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatePatientData(patientData: any): NewPatientData {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = patientData;
  const newPatient: NewPatientData = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
  /* eslint-enable */

  return newPatient;
}
