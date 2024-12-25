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
import useMetamask from "../hooks/useMetamask";
import { useState } from "react";

function MakePaymentWrapper() {
  const { order } = usePaymentGatewayContext();
  const { getItem } = useLocalStorage("order_created");
  const orderCreated: OrderCreated = getItem();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<"Web 3" | "Smart QR">(
    "Smart QR"
  );
  const [isWeb3Enabled] = useState(
    orderCreated.input_currency === "ETH_TEST5" ||
      order?.input_currency === "ETH_TEST5"
  );
  const paymentUri = order ? order.payment_uri : orderCreated.payment_uri;
  const expectedInputAmount = order
    ? order.expected_input_amount
    : orderCreated.expected_input_amount;
  const address = order ? order.address : orderCreated.address;
  const currecenySymbol = cleanCurrencySymbol(
    order ? order.input_currency : orderCreated.input_currency
  );
  const { connectMetamask, sendTransaction } = useMetamask();

  const handleButtonClick = (button: "Web 3" | "Smart QR") => {
    if (button === "Web 3" && !isWeb3Enabled) return;
    setActiveButton(button);
  };
  const handleConnect = async () => {
    if (!isWeb3Enabled) return;
    const isConnected = await connectMetamask();
    if (isConnected) {
      await sendTransaction(
        order ? order.address : orderCreated.address,
        order ? order.expected_input_amount : orderCreated.expected_input_amount
      );
    }
  };

  const copyToClipboard = async (field: string, text: string) => {
    if (navigator.clipboard) {
      try {
        setCopiedField(field);
        await navigator.clipboard.writeText(text);
        setTimeout(() => {
          setCopiedField(null);
        }, 400);
      } catch (err) {
        console.error("No se pudo copiar al portapapeles", err);
      }
    } else {
      console.warn("Clipboard API no soportada");
    }
  };

  return (
    <div className="p-[32px]">
      <p className="mb-[24px] font-w-bold text-font-l">Realiza el pago</p>
      <div className="w-[583px] gap-[24px] border-[1px] flex flex-col rounded-[16px] justify-between p-[32px] items-center border-tertiary shadow-md">
        <Timer />

        <div className="flex gap-[4px]">
          <SmallButton
            onClick={() => handleButtonClick("Smart QR")}
            text="Smart QR"
            isActive={activeButton === "Smart QR"}
          />
          <SmallButton
            onClick={() => {
              handleButtonClick("Web 3");
              handleConnect();
            }}
            text="Web 3"
            isActive={activeButton === "Web 3"}
          />
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
          <div className="flex items-center gap-[8px] relative">
            <p>Enviar</p>
            <p className="font-w-bold text-font-m">
              {expectedInputAmount} {currecenySymbol}
            </p>
            <Image
              onClick={() =>
                copyToClipboard(currecenySymbol, expectedInputAmount.toString())
              }
              className="cursor-pointer"
              src={copy}
              alt="copy"
              width={18}
              height={18}
            />
            {copiedField === currecenySymbol && (
              <div className="bg-primary-d right-[-78px] top-[-7px] absolute text-white font-w-bold p-1 rounded-lg">
                ¡Copiado!
              </div>
            )}
          </div>

          <div className="flex items-start gap-[8px] relative">
            <p className="text-cneter max-w-[416px] break-words">{address}</p>
            <Image
              className="cursor-pointer"
              onClick={() => copyToClipboard(address, address)}
              src={copy}
              alt="copy"
              width={18}
              height={18}
            />
            {copiedField === address && (
              <div className="bg-primary-d right-[-78px] top-[-7px] absolute text-white font-w-bold p-1 rounded-lg">
                ¡Copiado!
              </div>
            )}
          </div>
          {order?.tag_memo && (
            <div className="flex items-center gap-[8px] relative">
              <Image src={warn} alt="warn" width={24} height={24} />
              <p className="text-font-s">
                Etiqueta de destino: {order.tag_memo}
              </p>
              <Image
                onClick={() => copyToClipboard(order.tag_memo, order.tag_memo)}
                className="cursor-pointer"
                src={copy}
                alt="copy"
                width={18}
                height={18}
              />
              {copiedField === order.tag_memo && (
                <div className="bg-primary-d right-[-78px] top-[-7px] absolute text-white font-w-bold p-1 rounded-lg">
                  ¡Copiado!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MakePaymentWrapper;
