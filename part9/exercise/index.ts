import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

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
  .post('/exercises', express.json(), (req, res) => {
    interface ExercisesRequestBody {
      daily_exercises: Array<number>;
      target: number;
    }

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    function isExercisesRequestBody(body: any): body is ExercisesRequestBody {
      if (
        Object.prototype.hasOwnProperty.call(body, 'daily_exercises') &&
        Object.prototype.hasOwnProperty.call(body, 'target') &&
        Array.isArray(body.daily_exercises) &&
        typeof body.target === 'number'
      ) {
        const isDailyExercisesANumberArray: boolean = (
          body.daily_exercises as Array<any>
        ).reduce((areNumbers: boolean, dailyHours) => {
          const isNumber = !isNaN(+dailyHours);
          return isNumber && areNumbers;
        }, true);

        return isDailyExercisesANumberArray && !isNaN(body.target as number);
      } else {
        return false;
      }
    }
    /* eslint-enable */

    if (!isExercisesRequestBody(req.body)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!req.body.daily_exercises || !req.body.target) {
        throw new Error('Parameters missing.');
      } else {
        throw new Error('Malformatted parameters.');
      }
    }

    const { daily_exercises, target } = req.body;

    const result = calculateExercises(daily_exercises, target);

    res.json(result);
  })
  .use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).json({ error: err.message });
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
