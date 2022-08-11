import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

const PatientDetailsPage = () => {
  const { patientId } = useParams() as { patientId: string };
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[patientId];

  useEffect(() => {
    // Only fetch the additional patient data if it hasn't been already.
    // But this approach means it will never update....
    if (patient.ssn && patient.entries) return;

    axios
      .get<Patient>(`${apiBaseUrl}/patients/${patientId}`)
      .then(({ data: patient }) => {
        dispatch({ type: 'UPDATE_PATIENT', payload: patient });
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
        </>
      )}
    </article>
  );
};

export default PatientDetailsPage;
