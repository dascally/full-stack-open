import express from 'express';
import { calculator } from './calculator';

const PORT = 3003;
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || !value2 || isNaN(+value1) || isNaN(+value2)) {
    return res.status(400).send({ error: 'Must provide two numbers.' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(+value1, +value2, op);
  return res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
