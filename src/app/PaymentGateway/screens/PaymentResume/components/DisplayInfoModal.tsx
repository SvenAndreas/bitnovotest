import PrimaryButton from "../../../../shared/components/PrimaryButton";
import Image from "next/image";
import warning from "../../../../shared/assets/warning.svg";
import Modal from "@/app/shared/components/Modals/Modal";

function DisplayInfoModal({
  remainingAmount,
  handleClose,
  isOpen,
  currency
}: {
  remainingAmount: number | null;
  handleClose:()=>void,
  isOpen: boolean,
  currency:string
}) {
  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <div className="border-[1px] gap-3 bg-bg items-center md:max-w-[490px] border-tertiary shadow-md flex flex-col  p-[32px] rounded-[16px]">
        <div className="place-items-center">
          <Image src={warning} alt={"warning"} width={80} height={80} />
          <p className="text-font-l font-w-bold">¡Pago pendiente!</p>
          <p className="text-[#647184] text-center">
            Porfavor completar el pago
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-font-xn text-[#647184] text-center">
            Aún queda pendiente el envío de:
          </p>
          <p>{remainingAmount} {currency}</p>
        </div>
        <PrimaryButton text="Cerrar" onClick={handleClose} isActive={true} />
      </div>
    </Modal>
  );
}

export default DisplayInfoModal;
