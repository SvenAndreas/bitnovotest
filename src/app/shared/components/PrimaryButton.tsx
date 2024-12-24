

function PrimaryButton({text,isActive}:{text:string,isActive:boolean}) {
  return (
    <button className={`${isActive ? 'bg-primary' : 'bg-primary-l'} h-[56px] text-font-xn font-[600] rounded-[6px] py-[18px] text-white px-[24px]`}>{text}</button>
  )
}

export default PrimaryButton