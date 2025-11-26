import express from 'express';
import PatientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(PatientService.getNonSensitivePatientEntries());
});

export default router;