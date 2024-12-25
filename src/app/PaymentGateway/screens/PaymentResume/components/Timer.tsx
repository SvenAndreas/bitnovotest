import timer from "../../../../shared/assets/timer.svg";
import Image from "next/image";
import useCountdownTimer from "../hooks/useCountDownTimer";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { OrderDetail } from "@/app/PaymentGateway/types/paymentDetails";
import { calculateExpirationTimeInSeconds } from "../utils/calculateExpirationTimeInSeconds";
import { useEffect, useMemo, useState } from "react";
import { usePaymentGatewayContext } from "@/app/PaymentGateway/context/PaymentGatewayContext";
import { usePathname } from "next/navigation";

function Timer() {
  const router = useRouter();
  const pathname = usePathname();
  const { getItem: getOrderDetail } = useLocalStorage("order_detail");
  const { orderDetail } = usePaymentGatewayContext();
  const storedOrderDetail: OrderDetail = getOrderDetail();

  const [timeLeft, setTimeLeft] = useState(() => {
    return orderDetail
      ? 15 * 60
      : calculateExpirationTimeInSeconds(storedOrderDetail.expired_time);
  });

  useEffect(() => {
    setTimeLeft(
      orderDetail
        ? calculateExpirationTimeInSeconds(orderDetail.expired_time)
        : calculateExpirationTimeInSeconds(storedOrderDetail.expired_time)
    );
  }, [pathname, orderDetail, storedOrderDetail]);

  const { formattedTime } = useCountdownTimer(timeLeft, () => {
    router.replace("/payment/feedback/error");
  });

  return (
    <div className="flex items-center gap-[4px]">
      <Image src={timer} width={24} height={24} alt="timer" />
      <p className="text-font-s font-[600]">{formattedTime}</p>
    </div>
  );
}

export default Timer;
