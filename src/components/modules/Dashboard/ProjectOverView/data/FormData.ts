export const getLocale = (lang: string) =>
  lang.startsWith("ar") ? "ar-EG" : "en-US";

export const formatDate = (iso: string, lang: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(getLocale(lang), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// short month name from the month number (1-12), in the current language
export const getMonthLabel = (monthNumber: number, lang: string) =>
  new Date(2026, monthNumber - 1, 1).toLocaleDateString(getLocale(lang), {
    month: "short",
  });

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
