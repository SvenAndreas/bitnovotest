import React from "react";

function SmallButton({
  isActive,
  text,
  onClick,
}: {
  isActive: boolean;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-fit ${
        isActive ? "bg-primary text-white" : "bg-tertiary text-[#647184]"
      } py-[6px] px-[12px] rounded-full`}
    >
      {text}
    </button>
  );
}

export default SmallButton;
