import SmallButton from "@/app/shared/components/SmallButton";
import { QRCodeSVG } from "qrcode.react";
import timer from "../../../../shared/assets/timer.svg";
import copy from "../../../../shared/assets/copy.svg";
import warn from "../../../../shared/assets/warning.svg";
import Image from "next/image";
function MakePaymentWrapper() {
  return (
    <div className="p-[32px]">
      <p className="mb-[24px] font-w-bold text-font-l">Realiza el pago</p>
      <div className="w-[583px] gap-[24px] border-[1px] flex flex-col rounded-[16px] justify-between p-[32px] items-center border-tertiary shadow-md">
        <div className="flex items-center gap-[4px]">
          <Image src={timer} width={24} height={24} alt="timer" />
          <p className="text-font-s font-[600]">5:20</p>
        </div>

        <div className="flex gap-[4px]">
          <SmallButton text="Smart QR" isActive={true} />
          <SmallButton text="Web 3" isActive={false} />
        </div>

        <div className="p-[32px] shadow-xl rounded-[10px]">
          <QRCodeSVG
            value="https://ejemplo.com"
            size={171}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        </div>

        <div className="w-[416px] flex flex-col items-center gap-[12px]">
          <div className="flex items-center gap-[8px]">
            <p>Enviar</p>
            <p className="font-w-bold text-font-m">108,02 XRP</p>
            <Image src={copy} alt="copy" width={18} height={18} />
          </div>

          <div className="flex items-start gap-[8px]">
            <p className="text-cneter max-w-[416px] break-words">
              Xp4Lw2PtQgB7RmedTak143LrXp4Lw2PtQgB7RmedEV731CdTak143LrXp4L
            </p>
            <Image src={copy} alt="copy" width={18} height={18} />
          </div>

          <div className="flex items-center gap-[8px]">
            <Image src={warn} alt="warn" width={24} height={24} />
            <p className="text-font-s">Etiqueta de destino: 2557164061</p>
            <Image src={copy} alt="copy" width={18} height={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakePaymentWrapper;
