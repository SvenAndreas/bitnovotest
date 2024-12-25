import SmallButton from "@/app/shared/components/SmallButton";
import { QRCodeSVG } from "qrcode.react";
import copy from "../../../../shared/assets/copy.svg";
import warn from "../../../../shared/assets/warning.svg";
import Image from "next/image";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { usePaymentGatewayContext } from "@/app/PaymentGateway/context/PaymentGatewayContext";
import { OrderCreated } from "@/app/PaymentGateway/types/order";
import Timer from "./Timer";
import { cleanCurrencySymbol } from "@/app/PaymentGateway/utils/cleanCurrencySymbol";

function MakePaymentWrapper() {
  const { order } = usePaymentGatewayContext();
  const { getItem } = useLocalStorage("order_created");
  const orderCreated: OrderCreated = getItem();

  const paymentUri = order ? order.payment_uri : orderCreated.payment_uri;
  const expectedInputAmount = order
    ? order.expected_input_amount
    : orderCreated.expected_input_amount;
  const address = order ? order.address : orderCreated.address;
  const currecenySymbol= cleanCurrencySymbol(order ? order.input_currency : orderCreated.input_currency)
 
  return (
    <div className="p-[32px]">
      <p className="mb-[24px] font-w-bold text-font-l">Realiza el pago</p>
      <div className="w-[583px] gap-[24px] border-[1px] flex flex-col rounded-[16px] justify-between p-[32px] items-center border-tertiary shadow-md">
        <Timer />

        <div className="flex gap-[4px]">
          <SmallButton text="Smart QR" isActive={true} />
          <SmallButton text="Web 3" isActive={false} />
        </div>

        <div className="p-[32px] shadow-xl rounded-[10px]">
          <QRCodeSVG
            value={paymentUri}
            size={171}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        </div>

        <div className="w-[416px] flex flex-col items-center gap-[12px]">
          <div className="flex items-center gap-[8px]">
            <p>Enviar</p>
            <p className="font-w-bold text-font-m">{expectedInputAmount} {currecenySymbol}</p>
            <Image src={copy} alt="copy" width={18} height={18} />
          </div>

          <div className="flex items-start gap-[8px]">
            <p className="text-cneter max-w-[416px] break-words">{address}</p>
            <Image src={copy} alt="copy" width={18} height={18} />
          </div>
          {order?.tag_memo && (
            <div className="flex items-center gap-[8px]">
              <Image src={warn} alt="warn" width={24} height={24} />
              <p className="text-font-s">
                Etiqueta de destino: {order.tag_memo}
              </p>
              <Image src={copy} alt="copy" width={18} height={18} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MakePaymentWrapper;
