import { OrderDetail } from "@/app/PaymentGateway/types/paymentDetails";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useWebSocket(identifier: string | null) {
  const {removeItem} = useLocalStorage("order_created");
  const {removeItem: removeOrderDetail} = useLocalStorage("order_detail");
  const {removeItem:removeConcept} = useLocalStorage('order_created_concept');
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
        }
        if (data.status === "EX" || data.status === "OC") {
          router.replace("/payment/feedback/error");
        }
        removeConcept();
        removeOrderDetail()
        removeItem();
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
