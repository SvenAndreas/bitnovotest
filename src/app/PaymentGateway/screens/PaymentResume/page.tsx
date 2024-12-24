import React from 'react'
import SectionContainer from '../../components/SectionContainer'
import PaymentFeedback from './components/PaymentFeedback'

function PaymentResumeScreen() {
  return (
    <SectionContainer>
      {/* <div className="flex items-start gap-[32px]">
        <ResumeWrapper />
        <MakePaymentWrapper/>
      </div> */}
      <PaymentFeedback/>
    </SectionContainer>
  )
}

export default PaymentResumeScreen