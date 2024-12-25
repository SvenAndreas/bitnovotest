import { OrderDetail } from "@/app/PaymentGateway/types/paymentDetails";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useWebSocket(identifier: string) {
  const router = useRouter();
  useEffect(() => {
    if (!identifier) return;

    const socket = new WebSocket(
      `wss://payments.pre-bnvo.com/ws/${identifier}`
    );

    socket.onopen = () => {
      console.log("Conexión WebSocket abierta");
    };

    socket.onmessage = (event) => {
      try {
        const data: OrderDetail = JSON.parse(event.data);
        if (data.status === "CO" || data.status === "AC") {
          router.replace("/payment/feedback/success");
        }
        if (data.status === "EX" || data.status === "OC") {
          router.replace("/payment/feedback/error");
        }
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    };

    socket.onclose = ()=> {
      console.log("Conexión WebSocket cerrada");
    }

    return () => {
      socket.close();
    };
  }, [identifier]);
}

export default useWebSocket;
