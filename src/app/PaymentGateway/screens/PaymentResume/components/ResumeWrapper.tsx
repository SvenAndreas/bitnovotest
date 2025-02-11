import { usePaymentGatewayContext } from "@/app/PaymentGateway/context/PaymentGatewayContext";
import verify from "../../../../shared/assets/verify.svg";
import Image from "next/image";
import { cleanCurrencySymbol } from "@/app/PaymentGateway/utils/cleanCurrencySymbol";
import imagesMap from "@/app/PaymentGateway/utils/imagesMap";
import { formatNowDate } from "@/app/PaymentGateway/utils/formatNowDate";
import { useLocalStorage } from "@/app/shared/hooks/useLocalStorage";
import { OrderCreated } from "@/app/PaymentGateway/types/order";
import { OrderDetail } from "@/app/PaymentGateway/types/paymentDetails";

interface ResumeWrapperProps{
  paramsAmount:string | null,
  paramsMerchant:string | null,
  paramsConcept:string | null,
  paramsCurrency:string | null
}
function ResumeWrapper({paramsAmount,paramsMerchant,paramsConcept,paramsCurrency}:ResumeWrapperProps) {

  const { amount, concept, order } = usePaymentGatewayContext();
  const { getItem } = useLocalStorage("order_created");
  const { getItem: getOrderDetail } = useLocalStorage("order_detail");
  const { getItem: getOrderCreatedConcept } = useLocalStorage(
    "order_created_concept"
  );
  const orderCreatedConcept = getOrderCreatedConcept();


  const orderCreated: OrderCreated = getItem();
  const orderDetail: OrderDetail = getOrderDetail();
  const cleanedSymbol = cleanCurrencySymbol(
    order
      ? order.input_currency
      : paramsCurrency
      ? paramsCurrency
      : orderCreated.input_currency
  );
  const icon =
    imagesMap[order ? order.input_currency : orderCreated.input_currency];

  const date = formatNowDate();
  return (
    <div className="p-[32px]">
      <p className="mb-[24px] font-w-bold text-font-l">Resumen del pedido</p>
      <div className="bg-secondary-l rounded-[16px] min-w-[300px] p-[32px] flex flex-col gap-[31px] md:w-[583px]">
        <div className="h-[44px] border-b-[1px] border-primary-d md:w-[519px] flex justify-between">
          <p className="font-w-bold text-font-m">Importe:</p>
          <p className="font-w-bold text-font-m">
            {amount ? amount : paramsAmount}
            EUR
          </p>
        </div>

        <div className="h-[44px] border-b-[1px] border-primary-d md:w-[519px] flex justify-between">
          <p className="font-w-bold text-font-xn">Moneda seleccionada</p>
          <div className="flex items-start ">
            <div className="flex items-center gap-[5px] md:gap-[10px]">
              <Image
                src={icon}
                width={20}
                height={20}
                alt={`${cleanedSymbol} logo`}
              />
              <p className="font-w-bold text-font-xn">{cleanedSymbol}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col border-b-[1px] border-primary-d ">
          <div className="h-[44px] md:w-[519px] flex justify-between">
            <p className="font-w-bold text-font-xn">Comercio:</p>
            <div className="flex items-start gap-[2px]">
              <Image src={verify} width={24} height={24} alt="verify" />
              <p className="font-[600] text-font-xn">
                {paramsMerchant
                  ? paramsMerchant
                  : orderDetail.merchant_device
                  ? orderDetail.merchant_device
                  : "Comercio de pruebas de Semega"}
              </p>
            </div>
          </div>

          <div className="h-[44px] md:w-[519px] flex justify-between">
            <p className="font-w-bold text-font-xn">Fecha:</p>
            <p className="font-[600] text-font-xn">{date}</p>
          </div>
        </div>

        <div className="h-[44px] md:w-[519px] flex justify-between">
          <p className="font-w-bold text-font-xn">Concepto:</p>
          <p className="font-[600] text-font-xn">
            {concept
              ? concept
              : paramsConcept
              ? paramsConcept
              : orderCreatedConcept}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResumeWrapper;
