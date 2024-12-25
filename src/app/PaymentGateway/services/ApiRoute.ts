const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const DEVICE_ID = process.env.NEXT_PUBLIC_X_DIVICE_ID;

export const API_ROUTES = {
    CREATE_PAYMENT: `${API_URL}orders/`,
    GET_CURRENCIES: `${API_URL}currencies`,
    GET_ORDER_DETAIL: `${API_URL}orders/info/`
};