"use client";
import { Currency } from "@/app/PaymentGateway/types/currency";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const DEVICE_ID = process.env.NEXT_PUBLIC_X_DIVICE_ID;
const useGetCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const hanldleFetch = async () => {
    const response = await fetch(`${API_URL}currencies`, {
      method: "GET",
      headers: {
        "X-Device-Id": DEVICE_ID || "",
      },
    });
    if (!response.ok) {
      throw new Error("Error fetching currencies ");
    }
    return await response.json();
  };
  useEffect(() => {
    setIsloading(true);
    hanldleFetch()
      .then((res) => {
        setCurrencies(res);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return { currencies, error, isLoading };
};

export default useGetCurrencies;
