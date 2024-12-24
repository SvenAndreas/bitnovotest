export const validAmountFormat = (input: string): boolean => {
    const regex = /^\d+(\.\d{0,2})?$/;
    return regex.test(input);
  };