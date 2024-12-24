import PrimaryButton from "@/app/shared/components/PrimaryButton";
import SectionContainer from "../../components/SectionContainer";
import SelectCurrenciesWrapper from "./components/SelectCurrenciesWrapper";

import InputCreatePayment from "./components/InputCreatePayment";
import SelectInputCreatePayment from "./components/SelectInputCreatePayment";

function CreatePayment() {
  return (
    <SectionContainer>
      <div className="p-[32px] rounded-[6px] border-tertiary shadow-md border-[1px] w-[673px] h-[530px] flex flex-col gap-[32px]">
        <h1 className="text-center font-w-bold text-font-xl">Crear pago</h1>
        <div className="flex flex-col gap-[32px]">
          <InputCreatePayment label="Importe a pagar" value="20" />
          <SelectInputCreatePayment />
          <InputCreatePayment label="Concepto" value="Viaje & ocio" />
        </div>
        <PrimaryButton text="Continuar" />
      </div>
      {/* <SelectCurrenciesWrapper/> */}
    </SectionContainer>
  );
}

export default CreatePayment;
