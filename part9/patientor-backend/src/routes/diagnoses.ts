import express from 'express';
import * as diagnosesService from '../services/diagnoses.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosesService.getDiagnoses();

  res.json(diagnoses);
});

export default router;
