"use client";
import PrimaryButton from "@/app/shared/components/PrimaryButton";
import SectionContainer from "../../components/SectionContainer";
import InputCreatePayment from "./components/InputCreatePayment";
import SelectInputCreatePayment from "./components/SelectInputCreatePayment";
import useGetCurrencies from "./hooks/useGetCurrencies";
import { ChangeEvent, useCallback, useState } from "react";
import SelectCurrenciesWrapper from "./components/SelectCurrenciesWrapper";
import { getCurrencyLimits } from "./utils/getCurrencyLimits";
import { useSetMinMaxCurrencyAmount } from "./hooks/useSetMinMaxCurrencyAmount";
import { validAmountFormat } from "./utils/validAmountFormat";
import { validateAmountWithinLimits } from "./utils/validateWithinLimits";
import { useVerifyIfFormIsValid } from "./hooks/useVerifyIfFormIsValid";
import { createOrder } from "../../services/api/createOrder";
import { usePaymentGatewayContext } from "../../context/PaymentGatewayContext";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { fetchOrderDetail } from "../../services/api/fetchOrderDetail";

function CreatePayment() {
  const {
    amount,
    setAmount,
    concept,
    setConcept,
    setOrder,
    setIsLoading,
    isLoading,
    selectedCurrency,
    setSelectedCurrency
  } = usePaymentGatewayContext();
  const [isSelectCurrencyOpen, setIsSelectCurrencyOpen] = useState(false);
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState<{
    amount: string;
    concept: string;
  }>({ amount: "", concept: "" });

  const router = useRouter();

  const [currencyMinMaxAmount, setCurrencyMinMaxAmount] = useState<{
    minAmount: string;
    maxAmount: string;
  }>({ minAmount: "0", maxAmount: "0" });

  const { currencies } = useGetCurrencies();

  const { setItem } = useLocalStorage("order_created");
  const { setItem: setOrderDetail } = useLocalStorage("order_detail");
  const { setItem: setOrderCreatedConcept } = useLocalStorage(
    "order_created_concept"
  );

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
        setError((prev) => ({
          ...prev,
          amount: "",
        }));

        if (
          currencyMinMaxAmount.minAmount !== "0" &&
          currencyMinMaxAmount.maxAmount !== "0"
        ) {
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
          }
        }
      } else if (input === "") {
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
  const handleSubmit = async () => {
   
    try {
      setIsLoading(true);
      const res = await createOrder(amount, selectedCurrency.symbol);
      const orderDetail = await fetchOrderDetail(res.identifier);
      setOrderDetail(orderDetail);
      setOrder(res);
      setItem(res);
      setOrderCreatedConcept(concept);
      router.push(`/payment/resume?currency=${selectedCurrency.symbol}&amount=${amount}&concept=${concept}&identifier=${res.identifier}&merchant=${orderDetail.merchant_device}&address=${orderDetail.address}&crypto_amount=${res.expected_input_amount}&payment_uri=${res.payment_uri}${orderDetail.tag_memo ? `&tag=${orderDetail.tag_memo}` : ""}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionContainer>
      <div className="p-[32px] rounded-[6px] border-tertiary shadow-md border-[1px] md:w-[673px] marker:h-[530px] flex flex-col gap-[32px]">
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
        <PrimaryButton
          isLoading={isLoading}
          onClick={handleSubmit}
          isActive={isFormValid}
          text="Continuar"
        />
      </div>
    </SectionContainer>
  );
}

export default CreatePayment;
