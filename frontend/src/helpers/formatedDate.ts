//Short helper

export const formatShortDate = (dateString: string, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(dateString))
    .split(".")
    .reverse()
    .join("-");
};

// Beuty helper

export const formatLongDate = (dateString: string, locale: string): string => {
  const rawDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));

  // Отрезаем г., р.
  return rawDate.replace(/\s*[гр]\.?$/i, "");
};
