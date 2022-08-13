import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckRating,
  NewPatientData,
  PartialEntry,
} from './types.js';

function isGender(gender: unknown): gender is Gender {
  return Object.values(Gender as object).includes(gender);
}

function isStringDate(dateOfBirth: string): boolean {
  return /^\d{4}([-/])\d{2}\1\d{2}$/.test(dateOfBirth);
}

function isObject(object: unknown): object is Record<string | symbol, unknown> {
  return typeof object === 'object' && object !== null;
}

function isEntry(entry: unknown): entry is Entry {
  return (
    isObject(entry) &&
    typeof entry.type === 'string' &&
    (entry.type === 'Hospital' ||
      entry.type === 'OccupationalHealthcare' ||
      entry.type === 'HealthCheck')
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validatePatientData(patientData: any): NewPatientData {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = patientData;

  if (typeof name !== 'string') {
    throw new Error('Provided patient name is invalid.');
  }
  if (typeof dateOfBirth !== 'string' || !isStringDate(dateOfBirth)) {
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

  const unvalidatedEntries = patientData.entries as unknown;
  let entries: Entry[];
  if (
    Array.isArray(unvalidatedEntries) &&
    unvalidatedEntries.reduce(
      (areEntries: boolean, entry) => areEntries && isEntry(entry),
      true
    )
  ) {
    entries = unvalidatedEntries as Entry[];
  } else {
    entries = [];
  }

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

export function validateEntryData(entry: unknown): Omit<Entry, 'id'> {
  if (!isEntry(entry)) throw new Error('Entry is invalid.');

  const { type, description, date, specialist, diagnosisCodes } = entry;

  const errorList: Error[] = [];

  if (typeof description !== 'string' || description.length === 0) {
    errorList.push(new Error('Entry is missing a description.'));
  }
  if (typeof date !== 'string' || !isStringDate(date)) {
    errorList.push(new Error('Entry is missing a valid date.'));
  }
  if (typeof specialist !== 'string' || specialist.length === 0) {
    errorList.push(new Error('Entry is missing specialist name.'));
  }

  const unvalidatedCodes = diagnosisCodes as unknown;
  let validatedCodes: Diagnosis['code'][] | undefined;
  if (
    Array.isArray(unvalidatedCodes) &&
    unvalidatedCodes.reduce(
      (areValidCodes: boolean, code) =>
        areValidCodes && typeof code === 'string',
      true
    )
  ) {
    validatedCodes = unvalidatedCodes as Diagnosis['code'][];
  } else {
    validatedCodes = undefined;
  }

  const newEntryData: PartialEntry = { type, description, date, specialist };
  if (validatedCodes) newEntryData.diagnosisCodes = validatedCodes;

  switch (type) {
    case 'HealthCheck':
      if (!Object.values(HealthCheckRating).includes(entry.healthCheckRating)) {
        errorList.push(
          new Error('HealthCheck entry is missing a valid rating.')
        );
      }

      newEntryData.healthCheckRating = entry.healthCheckRating;

      break;
    case 'Hospital':
      if (
        !entry.discharge ||
        !entry.discharge.date ||
        !isStringDate(entry.discharge.date) ||
        !entry.discharge.criteria ||
        typeof entry.discharge.criteria !== 'string'
      ) {
        errorList.push(
          new Error('Hospital entry is missing valid discharge data.')
        );
      }

      newEntryData.discharge = {
        date: entry.discharge.date,
        criteria: entry.discharge.criteria,
      };

      break;
    case 'OccupationalHealthcare':
      if (
        typeof entry.employerName !== 'string' ||
        entry.employerName.length === 0
      ) {
        errorList.push(
          new Error('OccupationalHealthcare entry is missing an employer name.')
        );
      }

      newEntryData.employerName = entry.employerName;
      if (
        entry.sickLeave &&
        isStringDate(entry.sickLeave.startDate) &&
        isStringDate(entry.sickLeave.endDate)
      ) {
        newEntryData.sickLeave = {
          startDate: entry.sickLeave.startDate,
          endDate: entry.sickLeave.endDate,
        };
      }

      break;
    default:
      ((_assertNever: never) => undefined)(entry);
  }

  if (errorList.length > 0) {
    throw new AggregateError(errorList, 'Error validating new entry.');
  } else {
    const newEntry = newEntryData as Omit<Entry, 'id'>;

    return newEntry;
  }
}
