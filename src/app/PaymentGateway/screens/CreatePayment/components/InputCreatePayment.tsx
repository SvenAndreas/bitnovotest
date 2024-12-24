function InputCreatePayment({
  error,
  label,
  value,
  onChange,
}: {
  error?: string;
  label: string;
  value: string;
  onChange?: () => void;
}) {
  return (
    <label className="w-[609px] h-[80px] font-w-bold ">
      {label}
      <input
        value={value}
        onChange={onChange}
        className="border-[1px] mt-[4px] font-w-normal px-[12px] text-[14px] py-[18px] w-full rounded-[6px] focus:outline-none border-secondary"
        type="select"
      />
      {error && <p className="font-w-normal text-red-500">{error}</p>}
    </label>
  );
}

export default InputCreatePayment;
