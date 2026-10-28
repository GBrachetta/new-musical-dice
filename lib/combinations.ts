const letters = [..."abcdefghijkl"];

export function combinationNumber(selection: string[], ids: string[]): number {
  const ordered = orderSelection(selection);

  return (
    ids.reduce(
      (number, id) => number * ordered.length + ordered.indexOf(id[0]),
      0,
    ) + 1
  );
}

export function orderSelection(selection: string[]): string[] {
  return letters.filter((letter) => selection.includes(letter));
}

export function restoreCombination(
  selection: string[],
  number: number,
): string[] | null {
  const ordered = orderSelection(selection);

  if (
    ordered.length < 2 ||
    !Number.isSafeInteger(number) ||
    number < 1 ||
    number > ordered.length ** 12
  )
    return null;

  let value = number - 1;

  const ids: string[] = [];

  for (let column = 12; column >= 1; column--) {
    ids.unshift(
      `${ordered[value % ordered.length]}${String(column).padStart(2, "0")}`,
    );
    value = Math.floor(value / ordered.length);
  }

  return ids;
}
