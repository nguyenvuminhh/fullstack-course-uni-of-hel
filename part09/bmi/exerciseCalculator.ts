export const exerciseCalculator = (exerciseArray: number[], target: number): object => {
    const periodLength = exerciseArray.length;
    const trainingDays = exerciseArray.filter(a => a > 0).length;
    const rating = Math.floor(trainingDays*3/periodLength);
    const success = target > rating;
    let ratingDescription: string;
    if (rating >= 3) {
        ratingDescription = 'good';
    } else if (rating >= 2) {
        ratingDescription = 'moderate';
    } else if (rating >= 1) {
        ratingDescription = 'bad';
    } else {
        ratingDescription = 'terrible';
    };
    const sum = exerciseArray.reduce((a, b) => a+b, 0);
    const average = sum/periodLength;
    return ({
        periodLength, trainingDays, rating, success, ratingDescription, average
    });
};

const argsParser1 = (args: string[]): number[] => {
    if (args.map(a => !isNaN(Number(a))).every(a => a === true)) {
        return args.map(a => Number(a));
    }

    throw Error('Some arguments are not number');
};

try {
    const args = argsParser1(process.argv.slice(2));
    const exerciseArray = args.slice(1);
    const target = args[0];
    const result = exerciseCalculator(exerciseArray, target);
    console.log(result);
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}