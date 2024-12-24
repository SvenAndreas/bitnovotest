import Image from "next/image";
import React from "react";
import btc from "../../../../shared/assets/btc.svg";
import arrow_down from "../../../../shared/assets/arrow-down.svg";
function SelectInputCreatePayment() {
  return (
    <div className="w-[609px] cursor-pointer h-[80px] font-w-bold">
      <p>Seleccionar moneda</p>
      <div className="px-[16px] mt-[4px] py-[18px] border-[1px] border-secondary rounded-[6px]">
        <div className="flex gap-[8px] w-full">
          <Image src={btc} alt="btc" />
          <p className="font-w-normal">Bitcoin BTC</p>
          <Image className="ml-auto" src={arrow_down} alt="arrow_down" />
        </div>
      </div>
    </div>
  );
}

export default SelectInputCreatePayment;
