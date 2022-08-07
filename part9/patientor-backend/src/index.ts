import express from 'express';
import diagnosesRouter from './routes/diagnoses.js';

const PORT = 3001;

const app = express();

app.get('/api/ping', (_req, res) => {
  res.send('<p>Pong.</p>');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
