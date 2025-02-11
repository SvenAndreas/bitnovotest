import { ChangeEvent, memo } from "react";

function InputCreatePayment({
  error,
  label,
  value,
  onChange,
  type
}: {
  type:string,
  error?: string;
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="md:w-[609px] h-[80px] font-w-bold ">
      {label}
      <input
        value={value}
        onChange={onChange}
        className="border-[1px] mt-[4px] font-w-normal px-[12px] text-[14px] py-[18px] w-full rounded-[6px] focus:outline-none border-secondary"
        type={type}
      />
      {error && <p className="font-w-normal text-red-500">{error}</p>}
    </label>
  );
}

export default memo(InputCreatePayment)
