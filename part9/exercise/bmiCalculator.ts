function calculateBmi(heightInCm: number, weightInKg: number) {
  const bmi = weightInKg / (heightInCm / 100) ** 2;

  if (bmi < 18.5) {
    console.log('Underweight');
  } else if (bmi < 25.0) {
    console.log('Normal (healthy weight)');
  } else if (bmi < 30.0) {
    console.log('Overweight');
  } else {
    console.log('Obese');
  }

  return bmi;
}

function parseArgsForBmi(args: typeof process.argv) {
  if (args.length < 4) throw new Error('Too few arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  const heightInCm = +args[2];
  const weightInKg = +args[3];

  if (isNaN(heightInCm) || isNaN(weightInKg)) {
    throw new Error('Arguments must be numbers.');
  }

  return { heightInCm, weightInKg };
}

try {
  const { heightInCm, weightInKg } = parseArgsForBmi(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
}
// console.log(calculateBmi(180, 74));
