
import btc from "../../../../shared/assets/btc.svg";
import verify from "../../../../shared/assets/verify.svg";
import Image from "next/image";
function ResumeWrapper() {
  return (
    <div className="p-[32px]">
    <h1 className="mb-[24px] font-w-bold text-font-l">
      Resumen del pedido
    </h1>
    <div className="bg-secondary-l rounded-[16px] p-[32px] flex flex-col gap-[31px] w-[583px]">

      <div className="h-[44px] border-b-[1px] border-primary-d w-[519px] flex justify-between">
        <p className="font-w-bold text-font-m">Importe:</p>
        <p className="font-w-bold text-font-m">56,05 EUR</p>
      </div>
    

      <div className="h-[44px] border-b-[1px] border-primary-d w-[519px] flex justify-between">
        <p className="font-w-bold text-font-xn">Moneda seleccionada</p>
        <div className="flex items-start ">
          <div className="flex items-center gap-[10px]">
            <Image src={btc} width={20} height={20} alt="btc" />
            <p className="font-w-bold text-font-xn">XRP</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-b-[1px] border-primary-d ">
        <div className="h-[44px] w-[519px] flex justify-between">
          <p className="font-w-bold text-font-xn">Comercio:</p>
          <div className="flex items-start gap-[2px]">
            <Image src={verify} width={24} height={24} alt="verify" />
            <p className="font-[600] text-font-xn">
              Comercio de pruebas de Semega
            </p>
          </div>
        </div>

        <div className="h-[44px] w-[519px] flex justify-between">
          <p className="font-w-bold text-font-xn">Fecha:</p>
          <p className="font-[600] text-font-xn">56,05 EUR</p>
        </div>
      </div>

      <div className="h-[44px] w-[519px] flex justify-between">
        <p className="font-w-bold text-font-xn">Importe:</p>
        <p className="font-[600] text-font-xn">56,05 EUR</p>
      </div>
    </div>
  </div>
  )
}

export default ResumeWrapper