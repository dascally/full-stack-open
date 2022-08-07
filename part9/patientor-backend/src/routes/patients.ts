import express from 'express';
import * as patientsService from '../services/patients.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();

  res.json(patients);
});

export default router;
