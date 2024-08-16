import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import { addEntry, addPatient, getDiagnoses, getPatientByID, getPatientsNonSensitive } from "./service";
import { toNewEntry, toNewPatientEntry } from "./util/helperFunction";
const app = express();
import 'express-async-errors'


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('----------')
    next()
  })

app.get('/api/ping', (req, res) => {
    res.send('pong');
});

app.get('/api/diagnoses', (req, res) => {
    res.json(getDiagnoses())
});

app.get('/api/patients', (req, res) => {
    res.json(getPatientsNonSensitive())
})

app.get('/api/patients/:id', (req, res) => {
    const id = req.params.id
    const patient = getPatientByID(id)
    console.log(patient)
    res.json(patient)
})

app.post('/api/patients', (req, res) => {
    console.log('adding')
    try {
        const newPatientEntry = toNewPatientEntry(req.body)
        const result = addPatient(newPatientEntry)
        res.json(result)
    } catch (error) {
        if (error instanceof Error){
            res.status(400).json({error: 'Something went wrong. Error: ' + error.message})
        }
    }
})

app.post('/api/patients/:id', (req, res) => {
    const result = addEntry(toNewEntry(req.body), req.params.id)
    res.json(result)
})

app.use((e: Error, req: Request, res: Response, next: NextFunction) => {

    res.status(400).send({ error: e.message })
    next(e)
  }
  )

const PORT = 3001;

app.listen(PORT, () => {
    console.log("App is running at https//localhost:" + PORT);
})