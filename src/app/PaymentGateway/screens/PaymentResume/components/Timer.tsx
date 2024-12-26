import timer from "../../../../shared/assets/timer.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { OrderDetail } from "@/app/PaymentGateway/types/paymentDetails";
import { useEffect, useState } from "react";
import { calculateExpirationTimeInSeconds } from "../utils/calculateExpirationTimeInSeconds";
import { usePaymentGatewayContext } from "@/app/PaymentGateway/context/PaymentGatewayContext";

function Timer() {
  const { getItem: getOrderDetail } =
    useLocalStorage("order_detail");
  const { isLoading } = usePaymentGatewayContext();
  const storedOrderDetail: OrderDetail | null = getOrderDetail();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (storedOrderDetail && storedOrderDetail.expired_time) {
      setTimeLeft(
        calculateExpirationTimeInSeconds(storedOrderDetail.expired_time)
      );
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [storedOrderDetail]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerInterval);
          router.replace("/payment/feedback/error");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);


  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  if (isLoading || !isReady || timeLeft === null) {
    <div className="flex w-[68px] h-[24px] items-center gap-[4px]">
      <Image src={timer} width={24} height={24} alt="timer" />
    </div>;
  }
  return (
    <div className="flex items-center gap-[4px]">
      <Image src={timer} width={24} height={24} alt="timer" />
      <p className="text-font-s font-[600]">
        {timeLeft !== null ? formatTime(timeLeft) : ""}
      </p>
    </div>
  );
}

export default Timer;
