export const validateAmountWithinLimits = (
    amount: string,
    minAmount: string, 
    maxAmount: string
  ): string | null => {
    const numericAmount = parseFloat(amount);
    const numericMinAmount = parseFloat(minAmount);
    const numericMaxAmount = parseFloat(maxAmount);

    if (numericAmount < numericMinAmount) {
      return `El importe no puede ser menor a ${numericMinAmount.toFixed(2)}`;
    }
    if (numericAmount > numericMaxAmount) {
      return `El importe no puede ser mayor a ${numericMaxAmount.toFixed(2)}`;
    }
    return null;
  };