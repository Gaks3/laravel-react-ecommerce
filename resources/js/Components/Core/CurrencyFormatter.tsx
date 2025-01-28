type CurrencyFormatterProps = {
  amount: number;
  currency?: string;
  locale?: string;
};

export default function CurrencyFormatter({
  amount,
  currency = "USD",
  locale,
}: CurrencyFormatterProps) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
