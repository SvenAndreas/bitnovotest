import React, { useState } from "react";
import SearchInputGateway from "./SearchInputGateway";
import SelectCurrency from "./SelectCurrency";
import Image from "next/image";
import close from "../../../../shared/assets/close.svg";
import { Currency } from "@/app/PaymentGateway/types/currency";

interface SelectCurrenciesWrapperProps {
  handleOpenSelectCurreny: () => void;
  currencies: Currency[];
  handleSelectCurrency: (currency: { symbol: string; name: string }) => void;
  selectedCurrency: { symbol: string; name: string };
}
function SelectCurrenciesWrapper({
  handleOpenSelectCurreny,
  currencies,
  handleSelectCurrency,
  selectedCurrency,
}: SelectCurrenciesWrapperProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="p-[24px] z-100 rounded-[6px] border-tertiary shadow-md border-[1px] w-[673px] h-[588px] flex flex-col gap-[32px]">
      <div className="flex justify-between">
        <h2 className="font-w-bold text-font-m">Seleccionar criptomoneda</h2>
        <Image
          width={22}
          className="cursor-pointer w-[22px] h-[22px]"
          onClick={handleOpenSelectCurreny}
          height={22}
          src={close}
          alt="close"
        />
      </div>
      <SearchInputGateway
        searchTerm={searchTerm}
        onSearch={handleSearchChange}
      />
      <div className="flex flex-col justify-between">
        {filteredCurrencies.length > 0 &&
          filteredCurrencies.map((currency) => (
            <SelectCurrency
              selectedCurrency={selectedCurrency}
              handleSelectCurrency={handleSelectCurrency}
              key={currency.symbol}
              currency={currency}
              handleOpenSelectCurreny={handleOpenSelectCurreny}
            />
          ))}
        {filteredCurrencies.length === 0 && (
          <p className="text-font-m font-w-normal">
            No se encontraron resultados...
          </p>
        )}
      </div>
    </div>
  );
}

export default SelectCurrenciesWrapper;
