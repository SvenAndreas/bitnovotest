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
import metamask from "../../../../shared/assets/metamask.svg";
interface MakePaymentWrapperProps {
  paramsTag: string | null;
  paramsAddress: string | null;
  paramsCryptoAmount: string | null;
  paramsCurrency: string | null;
  paramsPaymentUri: string | null;
}
function MakePaymentWrapper({
  paramsTag,
  paramsAddress,
  paramsCryptoAmount,
  paramsCurrency,
  paramsPaymentUri,
}: MakePaymentWrapperProps) {
  const { order } = usePaymentGatewayContext();
  const { getItem } = useLocalStorage("order_created");
  const orderCreated: OrderCreated = getItem();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<"Web 3" | "Smart QR">(
    "Smart QR"
  );
  const [isWeb3Enabled] = useState(
    orderCreated.input_currency === "ETH_TEST5" ||
      order?.input_currency === "ETH_TEST5" ||
      paramsCurrency === "ETH_TEST5"
  );
  const paymentUri = order
    ? order.payment_uri
    : paramsPaymentUri
    ? paramsPaymentUri
    : orderCreated.payment_uri;

  const expectedInputAmount = order
    ? order.expected_input_amount
    : paramsCryptoAmount
    ? Number(paramsCryptoAmount)
    : orderCreated.expected_input_amount;

  const address = order
    ? order.address
    : paramsAddress
    ? paramsAddress
    : orderCreated.address;

  const tag = order?.tag_memo ? order.tag_memo : paramsTag ? paramsTag : "";

  const currecenySymbol = cleanCurrencySymbol(
    order ? order.input_currency : paramsCurrency ? paramsCurrency : orderCreated.input_currency
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
      <div className="md:w-[583px] gap-[24px] border-[1px] flex flex-col rounded-[16px] justify-between p-[32px] items-center border-tertiary shadow-md">
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
          {activeButton === "Smart QR" ? (
            <QRCodeSVG
              value={paymentUri}
              size={171}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          ) : (
            <div className="h-[171px] w-[171px] flex items-center">
              <Image width={171} height={171} src={metamask} alt="metamask" />
            </div>
          )}
        </div>

        <div className="md:w-[416px] flex flex-col items-center gap-[12px]">
          <div className="flex items-center  w-full md:w-auto  justify-between md:justify-normal gap-[8px] relative">
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

          <div className="flex items-center  w-full md:w-auto justify-between md:justify-normal md:items-start gap-[8px] relative">
            <p className="text-center max-w-[185px] md:text-left  md:max-w-[416px] break-words">{address}</p>
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
          {tag && (
            <div className="flex items-center w-full md:w-auto justify-between  md:justify-normal md:gap-[8px] relative">
              <Image src={warn} alt="warn" width={24} height={24} />
              <p className="text-font-s max-w-[180px] text-center md:text-left md:max-w-[416px]">Etiqueta de destino: {tag}</p>
              <Image
                onClick={() => copyToClipboard(tag, tag)}
                className="cursor-pointer"
                src={copy}
                alt="copy"
                width={18}
                height={18}
              />
              {copiedField === tag && (
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
