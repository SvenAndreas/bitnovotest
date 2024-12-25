

function PrimaryButton({text,isActive,isLoading,onClick}:{text:string,isActive:boolean,isLoading?:boolean,onClick?:() => void}) {
  return (
    <button disabled={!isActive} onClick={onClick} className={`${isActive ? 'bg-primary' : 'bg-primary-l'} h-[56px] text-font-xn font-[600] rounded-[6px] py-[18px] text-white px-[24px]`}>{isLoading ? 'Cargando...' : text}</button>
  )
}

export default PrimaryButton