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

console.log(calculateBmi(180, 74));
