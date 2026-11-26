export function getNameLetters(name: string) {
  return name.trim().slice(0, 2).toUpperCase().split("").join(" ");
}

export function pageList(current: number, last: number): (number | "gap")[] {
  if (last <= 5) {
    return Array.from({ length: last }, (_, index) => index + 1);
  }

  const pages = new Set([1, last, current - 1, current + 1]);

  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= last)
    .sort((a, b) => a - b);

  return sortedPages.flatMap((page, index) => {
    if (index > 0 && page - sortedPages[index - 1] > 1) {
      return ["gap" as const, page];
    }

    return [page];
  });
}
