import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { isArrayOfNumbers, isNumber } from './helper';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, _res) => {
    _res.send('Hello Full Stack');
});



app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;
    if (!isNumber(height) || !isNumber(weight)) {
        res.json({error: "malformatted parameters"});
    }
    const bmi = bmiCalculator(Number(height), Number(weight));
    res.json({height, weight, bmi});
});

interface ExerciseRequestBody {
    exerciseArray: number[];
    target: number;
}
    

app.post('/exercise', (req, res) => {
    const { exerciseArray, target } = req.body as ExerciseRequestBody;

    if (!exerciseArray || !target) {
        return res.status(400).json({ error: "Missing or invalid exercise data" });
    }

    if (!isArrayOfNumbers(exerciseArray)) {
        return res.status(400).json({ error: "Malformed parameters" });
    }

    const exerciseNumbers = exerciseArray.map(Number);

    if (exerciseNumbers.includes(NaN) || typeof target !== 'number') {
        return res.status(400).json({ error: "Malformed parameters" });
    } else {
        const result = exerciseCalculator(exerciseNumbers, target);
        return res.json(result);
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log('App is running at localhost:'+PORT);
});