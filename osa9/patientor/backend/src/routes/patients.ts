import express from "express";
import PatientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(PatientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  const patient = PatientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
    try {
  const newPatient = toNewPatient(req.body);
  const addedEntry = PatientService.addPatient(newPatient);
  res.json(addedEntry);
   } catch (error: unknown) {
    let errorMessage = 'Something went wrong :(';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;
