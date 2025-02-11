import Image from "next/image";
import React from "react";
import arrow_down from "../../../../shared/assets/arrow-down.svg";
import imagesMap from "@/app/PaymentGateway/utils/imagesMap";

function SelectInputCreatePayment({
  handleOpenSelectCurreny,
  selectedCurrency,
}: {
  handleOpenSelectCurreny: () => void;
  selectedCurrency: { symbol: string; name: string };
}) {
  const cleanedSymbol = selectedCurrency.symbol.replace(/_TEST.*/, "");
  const icon = imagesMap[selectedCurrency.symbol];
  return (
    <div onClick={handleOpenSelectCurreny} className="md:w-[609px] cursor-pointer h-[80px] font-w-bold">
      <p>Seleccionar moneda</p>
      <div className="px-[16px] mt-[4px] py-[18px] border-[1px] border-secondary rounded-[6px]">
        <div className="flex gap-[8px] w-full items-center">
          <Image src={icon} width={20} height={20} alt={`${cleanedSymbol} logo`} />
          <p className="font-w-normal">{cleanedSymbol}</p>
          <Image width={16} height={16} className="ml-auto" src={arrow_down} alt="arrow_down" />
        </div>
      </div>
    </div>
  );
}

export default SelectInputCreatePayment;
