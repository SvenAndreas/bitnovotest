"use client";
import React, { useEffect, useState } from "react";
import SectionContainer from "../../components/SectionContainer";
import ResumeWrapper from "./components/ResumeWrapper";
import MakePaymentWrapper from "./components/MakePaymentWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import useWebSocket from "./hooks/useWebSocket";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { OrderCreated } from "../../types/order";

import { cleanCurrencySymbol } from "../../utils/cleanCurrencySymbol";
import DisplayInfoModal from "./components/DisplayInfoModal";

function PaymentResumeScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getItem } = useLocalStorage("order_created");
  const [remainingAmount, setRemainingAmount] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const orderCreated: OrderCreated = getItem();
  const currency = cleanCurrencySymbol(orderCreated.input_currency);


  const paramsAmount = searchParams.get("amount");
  const paramsMerchant = searchParams.get("merchant");
  const paramsConcept = searchParams.get("concept");
  const paramsCurrency = searchParams.get("currency");

  const paramsTag = searchParams.get("tag");
  const paramsAddress = searchParams.get("address");
  const paramsCryptoAmount = searchParams.get("crypto_amount");
  const paramsPaymentUri = searchParams.get("payment_uri");

  const handleDisplayModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (!orderCreated) {
      router.back();
    }
  }, [router]);

  useWebSocket(
    orderCreated ? orderCreated.identifier : null,
    setRemainingAmount,
    handleDisplayModal
  );

  if (!orderCreated) {
    return null;
  }

  return (
    <SectionContainer>
      <div className="flex items-start gap-[32px]">
        <ResumeWrapper paramsAmount={paramsAmount} paramsMerchant={paramsMerchant} paramsConcept={paramsConcept} paramsCurrency={paramsCurrency} />
        <MakePaymentWrapper paramsCurrency={paramsCurrency} paramsPaymentUri={paramsPaymentUri} paramsAddress={paramsAddress} paramsTag={paramsTag} paramsCryptoAmount={paramsCryptoAmount} />
        <DisplayInfoModal
          handleClose={handleDisplayModal}
          isOpen={isOpen}
          remainingAmount={remainingAmount}
          currency={currency}
        />
      </div>
    </SectionContainer>
  );
}

export default PaymentResumeScreen;
