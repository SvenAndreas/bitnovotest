import { OrderCreated } from "../../types/order";
import { API_ROUTES, DEVICE_ID } from "../ApiRoute";

export const createOrder = async (
    expectedOutputAmount: string,
    currencySymbol: string
): Promise<OrderCreated> => {
    const formData = new FormData();
    formData.append("expected_output_amount", expectedOutputAmount); 
    formData.append("input_currency", currencySymbol);
   
  const response = await fetch(API_ROUTES.CREATE_PAYMENT, {
    method: "POST",
    headers: {
      "X-Device-Id": DEVICE_ID || "",
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Error creating order: ${response.statusText}`);
  }
  return await response.json();
};
