import SectionContainer from "../../components/SectionContainer";
import MakePaymentWrapper from "./components/MakePaymentWrapper";
import PaymentFeedback from "./components/PaymentFeedback";
import ResumeWrapper from "./components/ResumeWrapper";

export default function PaymentResumeScreen() {
  return (
    <SectionContainer>
      {/* <div className="flex items-start gap-[32px]">
        <ResumeWrapper />
        <MakePaymentWrapper/>
      </div> */}
      <PaymentFeedback/>
    </SectionContainer>
  );
}
