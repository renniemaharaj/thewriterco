export function generatePossibilities(from: number, to: number) {
  const array = Array.from(
    { length: to - from + 1 },
    (_, index) => from + index,
  );
  return array;
}

export function generateRandomNumber(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

export function sum(array: number[]) {
  return array.reduce((prev, cur) => prev + cur, 0);
}

export function mean(array: number[]) {
  return sum(array) / array.length;
}
