import { OrderDetail } from "@/app/PaymentGateway/types/paymentDetails";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useWebSocket(
  identifier: string | null,
  setRemainingAmount: React.Dispatch<React.SetStateAction<number | null>>,
  handleDisplayModal: () => void
) {
  const { removeItem } = useLocalStorage("order_created");
  const { removeItem: removeOrderDetail } = useLocalStorage("order_detail");
  const { removeItem: removeConcept } = useLocalStorage(
    "order_created_concept"
  );
  const router = useRouter();
  useEffect(() => {
    if (!identifier) return;

    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${identifier}`
    );

    socket.onmessage = (event) => {
      try {
        const data: OrderDetail = JSON.parse(event.data);
        if (data.status === "CO" || data.status === "AC") {
          router.replace("/payment/feedback/success");
          removeConcept();
          removeOrderDetail();
          removeItem();
        }
        if (data.status === "EX" || data.status === "OC") {
          router.replace("/payment/feedback/error");
          removeConcept();
          removeOrderDetail();
          removeItem();
        }
        if (data.confirmed_amount < data.crypto_amount) {
          const remainingAmount = data.crypto_amount - data.confirmed_amount;
          setRemainingAmount(remainingAmount)
          handleDisplayModal()
          return ;
        }
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    };

    return () => {
      socket.close();
    };
  }, [identifier]);
}

export default useWebSocket;
