import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../pages/Loading/Loading';

const PaymentForm = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Payment-form';
  }, []);
  const { bioId } = useParams(); // biodataId from URL
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');

  // Fetch biodata info
  const { isPending, data: biodataInfo = {} } = useQuery({
    queryKey: ['bioDatas', bioId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/alluser/bioDatas/${bioId}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { data: clientSecretData } = await axiosSecure.post(
      '/create-payment-intent',
      {
        amount: 500, // $5 in cents
      }
    );

    const clientSecret = clientSecretData.clientSecret;

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const saveRes = await axiosSecure.post('/alluser/contactRequest', {
        biodataId: bioId,
        email: user?.email,
        name: user?.displayName,
        paymentId: paymentIntent.id,
        status: 'pending',
      });

      if (saveRes.data?.insertedId) {
        setSuccess('✅ Payment successful! Contact request submitted.');
        navigate('/dashboard/my-contact-request');
      }
    }
  };
  console.log(biodataInfo);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-lime-600 mb-6">
        Complete Your Payment
      </h2>

      <div className="bg-lime-50 border border-lime-300 text-lime-700 text-sm p-4 rounded mb-6">
        <p className="font-semibold mb-1">💳 Test Card:</p>
        <p>
          Card: <span className="font-mono">4242 4242 4242 4242</span>
          <br />
          Exp: <span className="font-mono">12 / 34</span> &nbsp; CVC:{' '}
          <span className="font-mono">123</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Biodata ID Input (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biodata ID
          </label>
          <input
            type="text"
            value={biodataInfo.data.biodataId}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
          />
        </div>

        {/* ✅ Self Email Input (readonly) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-md"
          />
        </div>

        {/* ✅ Stripe Card Element */}
        <div className="p-4 border border-lime-300 rounded bg-gray-50 focus-within:ring-2 focus-within:ring-lime-400">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: {
                  color: '#e3342f',
                  iconColor: '#e3342f',
                },
              },
            }}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && (
          <p className="text-sm text-green-600 font-semibold">{success}</p>
        )}

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded-md transition duration-300 disabled:opacity-50"
        >
          Pay $5 for Contact Info
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
