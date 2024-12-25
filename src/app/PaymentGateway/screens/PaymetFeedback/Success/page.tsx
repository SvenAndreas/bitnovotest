import PaymentFeedback from "@/app/PaymentGateway/components/PaymentFeedback"
import SectionContainer from "@/app/PaymentGateway/components/SectionContainer"

function PaymentFeedbackSuccessScreen() {
  return (
    <SectionContainer>
      <PaymentFeedback success={true}/>
    </SectionContainer>
  )
}

export default PaymentFeedbackSuccessScreen