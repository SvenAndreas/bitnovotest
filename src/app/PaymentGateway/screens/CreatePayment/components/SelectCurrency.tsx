import tick from "../../shared/assets/tick-circle.svg";
import arrow from "../../shared/assets/arrow-right.svg";
import eth from "../../shared/assets/eth.svg";
import xrp from "../../shared/assets/xrp.svg";
import btc from "../../shared/assets/btc.svg";
import Image from "next/image";

const currencies = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", icon: btc },
  { id: "eth", name: "Ethereum", symbol: "ETH", icon: eth },
  { id: "xrp", name: "Ripple", symbol: "XRP", icon: xrp },
];
function SelectCurrency() {
  return (
    <div className="flex gap-[12px] px-[8px] py-[16px]">
      <Image width={32} height={32} src={btc} alt="tick" />
      <div>
        <p className="font-w-bold">Bitcoin</p>
        <p>BTC</p>
      </div>
      <Image className="ml-auto" src={arrow} alt="arrow" />
    </div>
  );
}

export default SelectCurrency;
