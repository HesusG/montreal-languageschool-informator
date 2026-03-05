const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number | null): string {
  if (amount == null) return 'Precio no disponible';
  return `${formatter.format(amount)} CAD`;
}

export function formatPricePerWeek(amount: number | null): string {
  if (amount == null) return 'Precio no disponible';
  return `${formatter.format(amount)} CAD/semana`;
}
