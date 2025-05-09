const placeHolderImage =
  "https://aharvey.com/wp-content/uploads/2018/03/bg-placeholder.jpg";

export function getRandomElement(array: string[]): string {
  if (array.length === 0) return placeHolderImage;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] as string;
}
