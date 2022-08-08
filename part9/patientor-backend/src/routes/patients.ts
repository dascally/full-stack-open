import express from 'express';
import * as patientsService from '../services/patients.js';
import { validatePatientData } from '../utils.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();

  res.json(patients);
});

router.post('/', (req, res) => {
  const newPatientData = validatePatientData(req.body);
  const addedPatient = patientsService.addPatient(newPatientData);

  res.json(addedPatient);
});

export default router;
