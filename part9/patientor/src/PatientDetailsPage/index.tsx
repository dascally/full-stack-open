import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Entry, HealthCheckRating, Patient } from '../types';

const AdditionalEntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <p style={{ margin: '0' }}>
          Health check rating: {HealthCheckRating[entry.healthCheckRating]}
        </p>
      );
    case 'Hospital':
      return (
        <p style={{ margin: '0' }}>
          Discharged: {entry.discharge.date}; {entry.discharge.criteria}
        </p>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <p style={{ margin: '0' }}>Employer name: {entry.employerName}</p>
          {entry.sickLeave ? (
            <p style={{ margin: '0' }}>
              Sick leave:{' '}
              {`${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`}
            </p>
          ) : null}
        </>
      );
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const assertNever: never = entry;
  }

  return null;
};

const PatientDetailsPage = () => {
  const { patientId } = useParams() as { patientId: string };
  const [{ patients, diagnosisCodes }, dispatch] = useStateValue();
  const patient = patients[patientId];

  useEffect(() => {
    // Only fetch the additional patient data if it hasn't been already.
    // But this approach means it will never update....
    if (patient && patient.ssn && patient.entries) return;

    axios
      .get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
      .then(({ data: patient }) => {
        dispatch(updatePatient(patient));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  return (
    <article>
      {!patient ? (
        <p>{"That user wasn't found!"}</p>
      ) : (
        <>
          <p>{patient.name}</p>
          <p>Gender: {patient.gender}</p>
          <p>SSN: {patient.ssn}</p>
          <p>Occupation: {patient.occupation}</p>

          <h4>Entries</h4>
          {patient?.entries?.length ? (
            patient.entries?.map((entry) => (
              <div key={entry.id} style={{ margin: '0 0 1rem' }}>
                <p style={{ margin: '0' }}>
                  {entry.date}: {entry.description}
                </p>
                <AdditionalEntryDetails entry={entry} />
                <p style={{ margin: '0' }}>Diagnosed by {entry.specialist}.</p>
                {entry.diagnosisCodes ? (
                  <ul style={{ margin: '0' }}>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>
                        {code}: {diagnosisCodes[code].name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: '0' }}>No diagnosis codes.</p>
                )}
              </div>
            ))
          ) : (
            <p>No entries recorded.</p>
          )}
        </>
      )}
    </article>
  );
};

export default PatientDetailsPage;
