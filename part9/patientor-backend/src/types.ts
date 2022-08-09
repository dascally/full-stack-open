export interface Error {
  status?: number;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientData = Omit<Patient, 'id'>;

export type PatientMinusSensitiveInfo = Omit<Patient, 'ssn'>;
