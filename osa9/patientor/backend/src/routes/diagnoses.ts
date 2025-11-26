import express from 'express';
import DiagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(DiagnoseService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoeses!');
});

export default router;