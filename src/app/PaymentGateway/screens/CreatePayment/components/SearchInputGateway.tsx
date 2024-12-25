import Image from "next/image";
import search from "../../../../shared/assets/search-normal.svg";
interface SearchInputGatewayProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function SearchInputGateway({ searchTerm, onSearch }: SearchInputGatewayProps) {
  return (
    <label className="flex gap-[8px] h-[48px] border-[1px] py-[14px] px-[12px] border-tertiary rounded-[6px]">
      <Image width={20} height={20} className="w-[20px] h-[20px]" src={search} alt="search" />
      <input
        className="w-full focus:outline-none"
        value={searchTerm}
        onChange={onSearch}
        placeholder="Buscar"
      />
    </label>
  );
}

export default SearchInputGateway;
