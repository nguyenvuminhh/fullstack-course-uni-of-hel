export const isNumber = (n: unknown): n is number => {
    if (isNaN(Number(n))) {
        return false;
    }
    return true;
};

export const  isArrayOfNumbers = (arr: unknown): arr is number[] => {
    return Array.isArray(arr) && arr.every(item => typeof item === 'number');
  };
  