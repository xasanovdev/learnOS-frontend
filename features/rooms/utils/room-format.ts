const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}
