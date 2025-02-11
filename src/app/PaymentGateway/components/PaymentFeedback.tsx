'use client'
import Image from 'next/image'
import check from '../../shared/assets/success.svg'
import error from '../../shared/assets/error.svg'
import PrimaryButton from '@/app/shared/components/PrimaryButton'
import { useRouter } from 'next/navigation';
import { usePaymentGatewayContext } from '../context/PaymentGatewayContext'
function PaymentFeedback({success}: {success: boolean}) {
  const router = useRouter();
  const {setSelectedCurrency,setAmount,setConcept} = usePaymentGatewayContext()
  const text = success ? 'Pago completado' : 'Pago cancelado'
  const handleClick = ()=>{
    setSelectedCurrency({symbol: 'BTC_TEST', name: 'Bitcoin Test BTC'})
    setAmount('')
    setConcept('')
    router.replace('/')
  }
  return (
    <div className="border-[1px] max-w-[490px] border-tertiary shadow-md flex flex-col justify-between p-[32px] rounded-[16px]">  
        <div className='flex flex-col items-center md:h-[300px] gap-[16px]'>
            <Image src={success ? check : error} alt={`${success ? 'success icon' : 'error icon'}`} width={80} height={80}/>
            <p className='text-font-l font-w-bold'>¡{text}!</p>
            <p className='text-font-xn text-[#647184] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, repellat? Quae, sapiente, quas impedit eum est dignissimos quibusdam, eligendi magnam asperiores nam aspernatur. Tempore quisquam distinctio sit assumenda veniam nisi?</p>
        </div>
        <PrimaryButton text='Crear nuevo pago' onClick={handleClick} isActive={true} />
    </div>
  )
}

export default PaymentFeedback