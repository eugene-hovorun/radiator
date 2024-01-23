export function pickRandomItems<T>(array: T[], count: number): T[] {
  if (count <= 0) {
    return [];
  }

  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);

  return shuffledArray.slice(0, Math.min(count, shuffledArray.length));
}

export function pickRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
