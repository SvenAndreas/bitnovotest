import { Dispatch, SetStateAction, useEffect } from "react";

export const useVerifyIfFormIsValid = (
  error: { amount: string; concept: string },
  concept: string,
  amount: string,
  setFormIsValid: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const isValid = !error.amount && !error.concept && amount !== "" && concept !== "";
    setFormIsValid(isValid)
  }, [error, concept, amount]);
};
