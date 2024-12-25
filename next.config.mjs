/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
          {
            source: '/payment/resume',
            destination: '/PaymentGateway/screens/PaymentResume',
          },
          {
            source: '/payment/feedback/success',
            destination: '/PaymentGateway/screens/PaymetFeedback/Success',
          },
          {
            source: '/payment/feedback/error',
            destination: '/PaymentGateway/screens/PaymetFeedback/Error',
          },
        ];
      },
};

export default nextConfig;
