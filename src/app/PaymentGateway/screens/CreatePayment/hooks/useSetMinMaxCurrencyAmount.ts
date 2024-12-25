import { Dispatch, SetStateAction, useEffect } from "react";
import { getCurrencyLimits } from "../utils/getCurrencyLimits";
import { Currency } from "@/app/PaymentGateway/types/currency";

export const useSetMinMaxCurrencyAmount = (
  currencies: Currency[],
  selectedCurrency: string,
  setCurrencyMinMaxAmount: Dispatch<SetStateAction<{ minAmount: string; maxAmount: string }>>
) => {
  useEffect(() => {
    if (selectedCurrency) {
      const { maxAmount, minAmount } = getCurrencyLimits(
        currencies,
        selectedCurrency
      );
      setCurrencyMinMaxAmount({ minAmount, maxAmount });
    }
  }, [selectedCurrency,currencies]);
};
