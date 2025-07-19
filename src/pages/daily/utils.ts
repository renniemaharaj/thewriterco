const placeHolderImage =
  "https://aharvey.com/wp-content/uploads/2018/03/bg-placeholder.jpg";

export function getRandomElement(array: string[]): string {
  if (array.length === 0) return placeHolderImage;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex] as string;
}

/**
 * Capitalizes the first letter of each word longer than 2 characters.
 * Leaves short words (<= 2 characters) unchanged.
 *
 * @param input - The input string to transform.
 * @returns A new string with big words capitalized.
 */
export function capitalizeBigWords(input: string): string {
  return input
    .split(" ")
    .map((word) => {
      return word.length > 2 ? word[0].toUpperCase() + word.slice(1) : word;
    })
    .join(" ");
}
