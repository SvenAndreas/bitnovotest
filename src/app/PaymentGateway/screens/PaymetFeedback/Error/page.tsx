import PaymentFeedback from "@/app/PaymentGateway/components/PaymentFeedback"
import SectionContainer from "@/app/PaymentGateway/components/SectionContainer"

function PaymentFeedbackErrorScreen() {
  return (
    <SectionContainer>
      <PaymentFeedback success={false}/>
    </SectionContainer>
  )
}

export default PaymentFeedbackErrorScreen