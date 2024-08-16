export const bmiCalculator = (height: number, weight: number): string => {
    const bmi = 10000 * weight / (height * height);
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    } else if (bmi < 16.9) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi < 18.4) {
        return 'Underweight (Mild thinness)';
    } else if (bmi < 24.9) {
        return 'Normal range';
    } else if (bmi < 29.9) {
        return 'Overweight (Pre-obese)';
    } else if (bmi < 34.9) {
        return 'Obese (Class I)';
    } else if (bmi < 39.9) {
        return 'Obese (Class II)';
    } else {
        return 'Obese (Class III)';
    }
};


const argsParser2 = (args: string[]): number[] => {
    if (args.map(a => !isNaN(Number(a))).every(a => a === true)) {
        return args.map(a => Number(a));
    }

    throw Error('Some arguments are not number' + args);
};

try {
    const args = argsParser2(process.argv.slice(2));
    const height = args[0];
    const weight = args[1];
    const result = bmiCalculator(height, weight);
    console.log(result);
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
  