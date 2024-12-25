
import dynamic from 'next/dynamic';

const PaymentResumeScreen = dynamic(() => import('./PaymentResumeScreen'), {
  ssr: false,
});
function PaymentResume() {

  return (
    <PaymentResumeScreen/>
  );
}

export default PaymentResume
