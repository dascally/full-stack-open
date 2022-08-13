import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_CODES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_PATIENT_ENTRY';
      payload: {
        patientId: string;
        entry: Entry;
      };
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patient,
  };
};

export const setDiagnosisCodes = (diagnosisCodes: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_CODES',
    payload: diagnosisCodes,
  };
};

export const addPatientEntry = (patientId: string, entry: Entry): Action => {
  return {
    type: 'ADD_PATIENT_ENTRY',
    payload: {
      patientId,
      entry,
    },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          },
        },
      };
    case 'ADD_PATIENT_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId],
            entries: !state.patients[action.payload.patientId].entries
              ? [action.payload.entry]
              : [
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  ...state.patients[action.payload.patientId].entries!,
                  action.payload.entry,
                ],
          },
        },
      };
    case 'SET_DIAGNOSIS_CODES':
      return {
        ...state,
        diagnosisCodes: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosisCodes,
        },
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assertNever: never = action;
      return state;
  }
};
