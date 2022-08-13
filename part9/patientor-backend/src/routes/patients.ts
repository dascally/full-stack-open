import express from 'express';
import * as patientsService from '../services/patients.js';
import { validateEntryData, validatePatientData } from '../utils.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();

  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);

  res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  const newEntry = validateEntryData(req.body);
  const addedEntry = patientsService.addPatientsEntry(patientId, newEntry);

  res.json(addedEntry);
});

router.post('/', (req, res) => {
  const newPatientData = validatePatientData(req.body);
  const addedPatient = patientsService.addPatient(newPatientData);

  res.json(addedPatient);
});

export default router;
