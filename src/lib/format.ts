/** "2026-12-05" → "5 Dec 2026", fixed to UTC so build and browser agree. */
export function formatDate(day: string) {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
