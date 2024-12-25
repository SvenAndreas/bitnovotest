'use client'
import React, { createContext, useState, ReactNode, useContext } from "react";
import { OrderCreated } from "../types/order";
import { OrderDetail } from "../types/paymentDetails";

interface PaymentGatewayContextType {
  amount: string;
  setAmount: (amount: string) => void;
  concept: string;
  setConcept: (concept: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  order: OrderCreated | null;
  setOrder: (order: OrderCreated) => void;
  orderDetail: OrderDetail | null
  setOrderDetail: (orderDetail: OrderDetail) => void
}

const PaymentGatewayContext = createContext<
  PaymentGatewayContextType | undefined
>(undefined);

interface PaymentGatewayProviderProps {
  children: ReactNode;
}
export const PaymentGatewayProvider = ({
  children,
}: PaymentGatewayProviderProps) => {
  const [amount, setAmount] = useState<string>("");
  const [concept, setConcept] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderCreated | null>(null);
  const [orderDetail,setOrderDetail] = useState<OrderDetail | null>(null)

  return (
    <PaymentGatewayContext.Provider
      value={{
        amount,
        setAmount,
        concept,
        setConcept,
        isLoading,
        setIsLoading,
        order,
        setOrder,
        setOrderDetail,
        orderDetail
      }}
    >
      {children}
    </PaymentGatewayContext.Provider>
  );
};

export const usePaymentGatewayContext = (): PaymentGatewayContextType => {
  const context = useContext(PaymentGatewayContext);
  if (!context) {
    throw new Error(
      "usePaymentGatewayContext must be used within a PaymentGatewayProvider"
    );
  }
  return context;
};
