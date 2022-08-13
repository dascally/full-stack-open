import { ErrorMessage, Field, Form, Formik } from 'formik';
// import { DiagnosisSelection } from '../AddPatientModal/FormField';
// import { useStateValue } from '../state';
import { EntryFormData } from '../types';

// function validate(values: EntryFormData) {}

const AddEntryForm = ({
  onSubmit,
}: {
  onSubmit: (values: EntryFormData) => void;
}) => {
  //   const [{ diagnosisCodes }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: '',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: undefined,
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className='form ui'>
          <div>
            <label htmlFor='type'>Type</label>
            <Field name='type' as='select'>
              <option value=''>Select an entry type</option>
              <option value='HealthCheck'>Health Check</option>
              <option value='Hospital'>Hospital</option>
              <option value='OccupationalHealthcare'>
                Occupational Healthcare
              </option>
            </Field>
            <ErrorMessage name='type' />
          </div>
          <div>
            <label htmlFor='description'>Description</label>
            <Field name='description' placeholder='Description' />
            <ErrorMessage name='description' />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <Field name='date' placeholder='YYYY-MM-DD' />
            <ErrorMessage name='date' />
          </div>
          <div>
            <label htmlFor='specialist'>Specialist</label>
            <Field name='specialist' placeholder='Specialist' />
            <ErrorMessage name='specialist' />
          </div>
          <div>
            {/* <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisCodes)}
            /> */}
            <p id='diagnosisCodesLabel' style={{ margin: 0 }}>
              Diagnosis codes
            </p>
            <div aria-labelledby='diagnosisCodesLabel'>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='M24.2' />{' '}
                M24.2
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='M51.2' />{' '}
                M51.2
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='S03.5' />{' '}
                S03.5
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='J10.1' />{' '}
                J10.1
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='J06.9' />{' '}
                J06.9
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='Z57.1' />{' '}
                Z57.1
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='N30.0' />{' '}
                N30.0
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='H54.7' />{' '}
                H54.7
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='J03.0' />{' '}
                J03.0
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='L60.1' />{' '}
                L60.1
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='Z74.3' />{' '}
                Z74.3
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='L20' /> L20
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='F43.2' />{' '}
                F43.2
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='S62.5' />{' '}
                S62.5
              </label>
              <label>
                <Field name='diagnosisCodes' type='checkbox' value='H35.29' />{' '}
                H35.29
              </label>
            </div>
            <ErrorMessage name='diagnosisCodes' />
          </div>
          <fieldset disabled={values.type !== 'HealthCheck'}>
            <legend>Health check entry details</legend>
            <div>
              <label htmlFor='healthCheckRating'>Health check rating</label>
              <Field name='healthCheckRating' as='select'>
                <option value=''>Select a rating</option>
                <option value='0'>Healthy</option>
                <option value='1'>Low risk</option>
                <option value='2'>High risk</option>
                <option value='3'>Critical risk</option>
              </Field>
              <ErrorMessage name='healthCheckRating' />
            </div>
          </fieldset>
          <fieldset disabled={values.type !== 'Hospital'}>
            <legend>Hospital entry details</legend>
            <div>
              <label htmlFor='discharge.date'>Discharge date</label>
              <Field name='discharge.date' placeholder='YYYY-MM-DD' />
              <ErrorMessage name='discharge.date' />
            </div>
            <div>
              <label htmlFor='discharge.criteria'>Discharge criteria</label>
              <Field
                name='discharge.criteria'
                placeholder='Discharge criteria'
              />
              <ErrorMessage name='discharge.criteria' />
            </div>
          </fieldset>
          <fieldset disabled={values.type !== 'OccupationalHealthcare'}>
            <legend>Occupational healthcare entry details</legend>
            <div>
              <label htmlFor='employerName'>Employer name</label>
              <Field name='employerName' placeholder='Employer name' />
              <ErrorMessage name='employerName' />
            </div>
            <div>
              <label htmlFor='sickLeave.startDate'>Sick leave start date</label>
              <Field name='sickLeave.startDate' placeholder='YYYY-MM-DD' />
              <ErrorMessage name='sickLeave.startDate' />
            </div>
            <div>
              <label htmlFor='sickLeave.endDate'>Sick leave end date</label>
              <Field name='sickLeave.endDate' placeholder='YYYY-MM-DD' />
              <ErrorMessage name='sickLeave.endDate' />
            </div>
          </fieldset>
          <button type='reset'>Reset</button>{' '}
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
