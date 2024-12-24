import CreatePayment from "./PaymentGateway/screens/CreatePayment/CreatePayment";
import PaymentResumeScreen from "./PaymentGateway/screens/PaymentResume/PaymentResumeScreen";
import Footer from "./shared/components/Footer";

export default async function App() {
  return (
    <>
      <main className="h-screen">
        <CreatePayment />
      </main>
      <Footer />
    </>
  );
}
//
