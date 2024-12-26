import tick from "../../../../shared/assets/tick-circle.svg";
import arrow from "../../../../shared/assets/arrow-right.svg";
import Image from "next/image";
import { Currency } from "@/app/PaymentGateway/types/currency";
import { cleanCurrencySymbol } from "@/app/PaymentGateway/utils/cleanCurrencySymbol";
import imagesMap from "@/app/PaymentGateway/utils/imagesMap";

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
      <Image
        loading="eager"
        className="w-[32px] h-[32px]"
        priority={true}
        width={32}
        height={32}
        src={icon}
        alt={`${cleanedSymbol} logo`}
      />
      <div>
        <p className="font-w-bold">
          {cleanedName == "Ethereum Sepolia" ? "Ethereum" : cleanedName}
        </p>
        <p>{cleanedSymbol}</p>
      </div>
      <Image
        className="w-[16px] h-[16px] ml-auto"
        width={16}
        height={16}
        src={selectedCurrency.symbol === currency.symbol ? tick : arrow}
        alt="arrow"
      />
    </div>
  );
}

export default SelectCurrency;
