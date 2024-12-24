"use client";
import PrimaryButton from "@/app/shared/components/PrimaryButton";
import SectionContainer from "../../components/SectionContainer";
import InputCreatePayment from "./components/InputCreatePayment";
import SelectInputCreatePayment from "./components/SelectInputCreatePayment";
import useGetCurrencies from "./hooks/useGetCurrencies";
import { ChangeEvent, useCallback, useState } from "react";
import SelectCurrenciesWrapper from "./components/SelectCurrenciesWrapper";
import { Currency } from "../../types/currency";
import { getCurrencyLimits } from "./utils/getCurrencyLimits";
import { useSetMinMaxCurrencyAmount } from "./hooks/useSetMinMaxCurrencyAmount";
import { validAmountFormat } from "./utils/validAmountFormat";
import { validateAmountWithinLimits } from "./utils/validateWithinLimits";
import { useVerifyIfFormIsValid } from "./hooks/useVerifyIfFormIsValid";

function CreatePayment() {
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState("");
  const [isSelectCurrencyOpen, setIsSelectCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<{
    symbol: string;
    name: string;
  }>({
    symbol: "BTC_TEST",
    name: "Bitcoin Test BTC",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const [error, setError] = useState<{
    amount: string;
    concept: string;
  }>({ amount: "", concept: "" });

  const [currencyMinMaxAmount, setCurrencyMinMaxAmount] = useState<{
    minAmount: string;
    maxAmount: string;
  }>({ minAmount: "0", maxAmount: "0" });

  const { currencies } = useGetCurrencies();
  useSetMinMaxCurrencyAmount(
    currencies,
    selectedCurrency.symbol,
    setCurrencyMinMaxAmount
  );

  useVerifyIfFormIsValid(error, concept, amount, setIsFormValid);

  const handleChangeAmount = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      if (validAmountFormat(input)) {
        setAmount(input);
        const error = validateAmountWithinLimits(
          input,
          currencyMinMaxAmount.minAmount,
          currencyMinMaxAmount.maxAmount
        );
        if (error) {
          setError((prev) => ({
            ...prev,
            amount: error,
          }));
        } else {
          setError((prev) => ({
            ...prev,
            amount: "",
          }));
        }
      }

      if (input === "") {
        setAmount("");
        setError((prev) => ({
          ...prev,
          amount: "El importe es obligatorio.",
        }));
      }
    },
    [currencyMinMaxAmount]
  );

  const handleChangeConcept = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setConcept(newValue);
      if (newValue.length == 0) {
        setError((prev) => ({
          ...prev,
          concept: "El concepto es requerido.",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          concept: "",
        }));
      }
    },
    []
  );

  const handleSelecCurrency = useCallback(
    (currency: { symbol: string; name: string }) => {
      setSelectedCurrency(currency);
      getCurrencyLimits(currencies, currency.symbol);
    },
    []
  );

  //PREGUNTAR PQ SIN LA DEPENDECIA NO ME GESTIONABA EL CAMBIO DE ESTADO, QUEDABA SIEMPRE EN EL QUE LO HABIA TOCADO
  const handleOpenSelectCurreny = useCallback(() => {
    setIsSelectCurrencyOpen(!isSelectCurrencyOpen);
  }, [isSelectCurrencyOpen]);

  if (isSelectCurrencyOpen) {
    return (
      <SectionContainer>
        <SelectCurrenciesWrapper
          currencies={currencies}
          handleOpenSelectCurreny={handleOpenSelectCurreny}
          handleSelectCurrency={handleSelecCurrency}
          selectedCurrency={selectedCurrency}
        />
      </SectionContainer>
    );
  }
  return (
    <SectionContainer>
      <div className="p-[32px] rounded-[6px] border-tertiary shadow-md border-[1px] w-[673px] h-[530px] flex flex-col gap-[32px]">
        <h1 className="text-center font-w-bold text-font-xl">Crear pago</h1>
        <div className="flex flex-col gap-[32px]">
          <InputCreatePayment
            type="text"
            label="Importe a pagar"
            value={amount}
            onChange={handleChangeAmount}
            error={error.amount ? error.amount : undefined}
          />
          <SelectInputCreatePayment
            handleOpenSelectCurreny={handleOpenSelectCurreny}
            selectedCurrency={selectedCurrency}
          />
          <InputCreatePayment
            type="text"
            label="Concepto"
            value={concept}
            onChange={handleChangeConcept}
            error={error.concept ? error.concept : undefined}
          />
        </div>
        <PrimaryButton isActive={isFormValid} text="Continuar" />
      </div>
      {/* <SelectCurrenciesWrapper/> */}
    </SectionContainer>
  );
}

export default CreatePayment;
