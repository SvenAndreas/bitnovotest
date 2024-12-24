import { Currency } from "@/app/PaymentGateway/types/currency";

export const getCurrencyLimits = (
  currencies: Currency[],
  selectedCurrencySymbol: string
) => {
  const currency = currencies.find(
    (currency) => currency.symbol === selectedCurrencySymbol
  );
  return {
    minAmount: currency ? currency.min_amount : '0',
    maxAmount: currency ? currency.max_amount : '0',
  };
};
