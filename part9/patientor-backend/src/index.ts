import express from 'express';
import diagnosesRouter from './routes/diagnoses.js';
import patientsRouter from './routes/patients.js';

const PORT = 3001;

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('<p>Pong.</p>');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
