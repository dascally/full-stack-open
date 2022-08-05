interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');
  if (args.length > 4) throw new Error('Too many arguments.');

  if (!isNaN(+args[2]) && !isNaN(+args[3])) {
    return {
      value1: +args[2],
      value2: +args[3],
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
};

const multiplier = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplier(value1, value2, `Multiplied ${value1} and ${value2}, yielding:`);
} catch (err) {
  let errMsg = 'Something bad happened.';
  if (err instanceof Error) {
    errMsg += ' Error: ' + err.message;
  }
  console.log(errMsg);
}
