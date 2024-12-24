import CreatePayment from "./PaymentGateway/screens/CreatePayment/CreatePayment";
import Footer from "./shared/components/Footer";

export default function Home() {
  return (
    <>
      <main className="h-screen">
        <CreatePayment />
      </main>
      <Footer />
    </>
  );
}
