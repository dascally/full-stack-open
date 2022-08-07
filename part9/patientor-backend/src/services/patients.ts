import type { PatientMinusSensitiveInfo } from '../types.js';
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
