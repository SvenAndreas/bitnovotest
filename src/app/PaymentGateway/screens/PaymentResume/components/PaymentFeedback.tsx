import Image from 'next/image'
import success from '../../../../shared/assets/success.svg'
import PrimaryButton from '@/app/shared/components/PrimaryButton'
function PaymentFeedback() {
  return (
    <div className="border-[1px] max-w-[490px] border-tertiary shadow-md flex flex-col justify-between p-[32px] rounded-[16px]">
        <div className='flex flex-col items-center h-[300px] gap-[16px]'>
            <Image src={success} alt="success" width={80} height={80}/>
            <p className='text-font-l font-w-bold'>¡Pago completado!</p>
            <p className='text-font-xn text-[#647184] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, repellat? Quae, sapiente, quas impedit eum est dignissimos quibusdam, eligendi magnam asperiores nam aspernatur. Tempore quisquam distinctio sit assumenda veniam nisi?</p>
        </div>
        <PrimaryButton text='Crear nuevo pago'/>
    </div>
  )
}

export default PaymentFeedback