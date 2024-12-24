import React from "react";
import SearchInputGateway from "./SearchInputGateway";
import SelectCurrency from "../../../components/SelectCurrency";

function SelectCurrenciesWrapper() {
  return (
    <div className="p-[24px] z-100 rounded-[6px] border-tertiary shadow-md border-[1px] w-[673px] h-fit flex flex-col gap-[32px]">
      <h2 className="font-w-bold text-font-m">Seleccionar criptomoneda</h2>
      <SearchInputGateway />
      <div className="flex flex-col justify-between">
        <SelectCurrency />
        <SelectCurrency />
        <SelectCurrency />
        <SelectCurrency />
     
      </div>
    </div>
  );
}

export default SelectCurrenciesWrapper;
