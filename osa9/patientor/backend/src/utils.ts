import { NewPatient, Gender } from "./types";
import z from "zod";

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: z.string().parse(object.name),
      dateOfBirth: z.iso.date().parse(object.dateOfBirth),
      ssn: z.string().parse(object.ssn),
      gender: z.enum(Gender).parse(object.gender),
      occupation: z.string().parse(object.occupation),
      entries:[]
    };
    return newPatient;
  }
  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;
