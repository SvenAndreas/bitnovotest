"use client";
import { fetchCurrencies } from "@/app/PaymentGateway/services/api/fetchCurrencies";
import { Currency } from "@/app/PaymentGateway/types/currency";
import { useEffect, useState } from "react";

const useGetCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setIsloading(true);
    fetchCurrencies()
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
