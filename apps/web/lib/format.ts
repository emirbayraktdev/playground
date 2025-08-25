export function formatDate(d: Date | string | number): string {
  try {
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d ?? "");

    const day = String(dt.getDate()).padStart(2, "0");
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const year = dt.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return String(d ?? "");
  }
}
