export const cleanCurrencySymbol = (symbol: string) => {
    const cleanedSymbol = symbol.replace(/_TEST.*/, "");
    return cleanedSymbol
}