import Image from "next/image"
import footer from '../assets/bitnovofooter.svg'
function Footer() {
  return (
    <footer className="fixed w-full bottom-0 place-items-center p-[16px]">
        <Image priority={true} src={footer} alt="footer" />
    </footer>
  )
}

export default Footer