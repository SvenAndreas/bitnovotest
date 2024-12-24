import Image from "next/image";
import search from "../../shared/assets/search-normal.svg";

function SearchInputGateway() {
  return (
      <label className="flex gap-[8px] h-[48px] border-[1px] py-[14px] px-[12px] border-tertiary rounded-[6px]">
        <Image src={search} alt="search" />
        <input className="w-full focus:outline-none" placeholder="Buscar" />
      </label>
  );
}

export default SearchInputGateway;
