import express, { Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

type ExercisesBody = {target: number; daily_exercises: number[]};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight)) || Number(height)<= 0 || Number(weight)<= 0) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    const result =  calculateBmi(Number(height),Number(weight));
    
    res.json({
        weight: weight,
        height: height,
        bmi: result
    });
});


 app.post('/exercises', (req: Request<object, object, ExercisesBody>, res: Response) => {
    const {target, daily_exercises} = req.body;
    if (daily_exercises.every((arg: number) => isNaN(Number(arg)) || Number(arg) <= 0) || isNaN(target) || target<0) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    } 
    const result = calculateExercises(target, daily_exercises);
    res.json(result);
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});