import { OrderDetail } from "../../types/paymentDetails";
import { API_ROUTES, DEVICE_ID } from "../ApiRoute";

export const fetchOrderDetail = async (identifier:string): Promise<OrderDetail> => {
  const response = await fetch(`${API_ROUTES.GET_ORDER_DETAIL}${identifier}`, {
    method: "GET",
    headers: {
      "X-Device-Id": DEVICE_ID || "",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching order details: ${response.statusText}`);
  }
  const data = await response.json();
  const paymentDeatils = data[0]
  return paymentDeatils
};
