import Image from 'next/image'
import check from '../../shared/assets/success.svg'
import error from '../../shared/assets/error.svg'
function PaymentFeedback({success}: {success: boolean}) {
  const text = success ? 'Pago completado' : 'Pago cancelado'
  return (
    <div className="border-[1px] max-w-[490px] border-tertiary shadow-md flex flex-col justify-between p-[32px] rounded-[16px]">  
        <div className='flex flex-col items-center h-[300px] gap-[16px]'>
            <Image src={success ? check : error} alt={`${success ? 'success icon' : 'error icon'}`} width={80} height={80}/>
            <p className='text-font-l font-w-bold'>¡{text}!</p>
            <p className='text-font-xn text-[#647184] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, repellat? Quae, sapiente, quas impedit eum est dignissimos quibusdam, eligendi magnam asperiores nam aspernatur. Tempore quisquam distinctio sit assumenda veniam nisi?</p>
        </div>
    </div>
  )
}

export default PaymentFeedback