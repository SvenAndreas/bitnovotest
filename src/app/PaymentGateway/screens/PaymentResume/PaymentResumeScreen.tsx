"use client";
import React, { useEffect } from "react";
import SectionContainer from "../../components/SectionContainer";
import ResumeWrapper from "./components/ResumeWrapper";
import MakePaymentWrapper from "./components/MakePaymentWrapper";
import { useRouter } from "next/navigation";
import useWebSocket from "./hooks/useWebSocket";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { fetchOrderDetail } from "../../services/api/fetchOrderDetail";
import { OrderCreated } from "../../types/order";
import { usePaymentGatewayContext } from "../../context/PaymentGatewayContext";

function PaymentResumeScreen() {
  const { setOrderDetail } = usePaymentGatewayContext();
  const router = useRouter();
  const { getItem } = useLocalStorage("order_created");
  const { setItem } = useLocalStorage("order_detail");
  const orderCreated: OrderCreated = getItem();
  useEffect(() => {
    if (orderCreated) {
      fetchOrderDetail(orderCreated.identifier)
        .then((res) => {
          setOrderDetail(res);
          setItem(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.back();
    }
  }, [router]);

  useWebSocket(orderCreated.identifier);

  if (!orderCreated) {
    return null;
  }

  return (
    <SectionContainer>
      <div className="flex items-start gap-[32px]">
        <ResumeWrapper />
        <MakePaymentWrapper />
      </div>
    </SectionContainer>
  );
}

export default PaymentResumeScreen;
