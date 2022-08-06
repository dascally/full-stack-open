import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import calculateBmi from './bmiCalculator';

const PORT = 3003;
const app = express();

app
  .get('/hello', (_req, res) => {
    res.send('<p>Hello, Full Stack!</p>');
  })
  .get('/bmi', (req, res) => {
    let height: number | typeof req.query['height'] = req.query.height;
    let weight: number | typeof req.query['weight'] = req.query.weight;

    if (!height || !weight) {
      throw new Error('Must provide a height and weight.');
    }

    height = +height;
    weight = +weight;

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Invalid height or weight provided.');
    }

    const bmiResult = calculateBmi(height, weight);

    res.json({ weight, height, bmi: bmiResult.message });
  })
  .use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).json({ error: err.message });
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
