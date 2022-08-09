import express, { NextFunction, Request, Response } from 'express';
import { Error } from './types.js';
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

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status((err as Error).status || 500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
