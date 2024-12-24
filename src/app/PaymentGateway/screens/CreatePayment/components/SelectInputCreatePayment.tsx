import Image from "next/image";
import React from "react";
import btc from "../../../../shared/assets/btc.svg";
import arrow_down from "../../../../shared/assets/arrow-down.svg";
import imagesMap from "../utils/imagesMap";
function SelectInputCreatePayment({
  handleOpenSelectCurreny,
  selectedCurrency,
}: {
  handleOpenSelectCurreny: () => void;
  selectedCurrency: { symbol: string; name: string };
}) {
  const cleanedName = selectedCurrency.name.replace(/( Sepolia| Test.*| ETH)$/, "");
  const cleanedSymbol = selectedCurrency.symbol.replace(/_TEST.*/, "");
  const icon = imagesMap[selectedCurrency.symbol];
  return (
    <div onClick={handleOpenSelectCurreny} className="w-[609px] cursor-pointer h-[80px] font-w-bold">
      <p>Seleccionar moneda</p>
      <div className="px-[16px] mt-[4px] py-[18px] border-[1px] border-secondary rounded-[6px]">
        <div className="flex gap-[8px] w-full items-center">
          <Image src={icon} width={20} height={20} alt={`${cleanedSymbol} logo`} />
          <p className="font-w-normal">{cleanedSymbol}</p>
          <Image className="ml-auto" src={arrow_down} alt="arrow_down" />
        </div>
      </div>
    </div>
  );
}

export default SelectInputCreatePayment;
