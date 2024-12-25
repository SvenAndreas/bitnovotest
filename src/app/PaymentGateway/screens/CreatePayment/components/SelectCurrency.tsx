import tick from "../../../../shared/assets/tick-circle.svg";
import arrow from "../../../../shared/assets/arrow-right.svg";
import Image from "next/image";
import { Currency } from "@/app/PaymentGateway/types/currency";
import imagesMap from "../utils/imagesMap";
import { cleanCurrencySymbol } from "@/app/PaymentGateway/utils/cleanCurrencySymbol";

interface SelectCurrencyProps {
  handleSelectCurrency: (currency: { symbol: string; name: string }) => void;
  currency: Currency;
  selectedCurrency: { symbol: string; name: string };
  handleOpenSelectCurreny: () => void;
}

function SelectCurrency({
  currency,
  handleSelectCurrency,
  selectedCurrency,
  handleOpenSelectCurreny,
}: SelectCurrencyProps) {
  const cleanedName = currency.name.replace(/( Sepolia| Test.*| ETH)$/, "");
  const cleanedSymbol = cleanCurrencySymbol(currency.symbol);
  const icon = imagesMap[currency.symbol];

  return (
    <div
      onClick={() => {
        handleSelectCurrency({
          symbol: currency.symbol,
          name: currency.name,
        });
        handleOpenSelectCurreny();
      }}
      className="flex gap-[12px] cursor-pointer px-[8px] py-[16px]"
    >
      <Image width={32} height={32} src={icon} alt="tick" />
      <div>
        <p className="font-w-bold">
          {cleanedName == "Ethereum Sepolia" ? "Ethereum" : cleanedName}
        </p>
        <p>{cleanedSymbol}</p>
      </div>
      <Image
        className="ml-auto"
        src={selectedCurrency.symbol === currency.symbol ? tick : arrow}
        alt="arrow"
      />
    </div>
  );
}

export default SelectCurrency;
