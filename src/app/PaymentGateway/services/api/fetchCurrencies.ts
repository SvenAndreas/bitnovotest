import { Currency } from "../../types/currency";
import { API_ROUTES, DEVICE_ID } from "../ApiRoute";

export const fetchCurrencies = async (): Promise<Currency[]> => {
  const response = await fetch(API_ROUTES.GET_CURRENCIES, {
    method: "GET",
    headers: {
      "X-Device-Id": DEVICE_ID || "",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching currencies: ${response.statusText}`);
  }

  return await response.json();
};
