import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const MembershipPlans = () => {
  return (
    <section className="bg-lime-50 dark:bg-black py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
          <span className="text-lime-600">Membership</span> Plans
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Primarily it's free to search any profiles. <strong>Upgrade</strong>{' '}
          for customized the search. With a paid membership, you can seamlessly
          connect with your prospects and get more responses. Many have found
          their love. Are you ready to meet your Soul Mate?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-left">
            <h3 className="text-2xl font-bold text-lime-600 mb-4">FREE</h3>
            <ul className="space-y-3">
              {[
                'Search Profiles',
                'Shortlist & Send Interest',
                'Photo Album',
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center text-black dark:text-white"
                >
                  <FaCheckCircle className="text-lime-600 mr-2" /> {feature}
                </li>
              ))}
              {[
                'Chat & Messaging',
                'View contacts of members you like',
                'Priority customer support',
                'Profile Boost',
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center text-gray-500 dark:text-gray-400 line-through"
                >
                  <FaTimesCircle className="text-gray-400 mr-2" /> {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="inline-block mt-6 bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-2 rounded shadow transition"
            >
              Free Register
            </Link>
          </div>

          {/* Paid Plan */}
          <div className="bg-lime-600 dark:bg-lime-700 rounded-lg shadow p-6 text-left text-white relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">PAID</h3>
            <ul className="space-y-3">
              {[
                'Search Profiles',
                'Shortlist & Send Interest',
                'Photo Album',
                'Chat & Messaging',
                'View contacts of members you like',
                'Priority customer support',
                'Profile Boost',
              ].map((feature, i) => (
                <li key={i} className="flex items-center">
                  <FaCheckCircle className="text-white mr-2" /> {feature}
                </li>
              ))}
            </ul>
            <button
              disabled
              className="inline-block mt-6 bg-white/90 text-lime-700 font-semibold px-6 py-2 rounded shadow cursor-not-allowed"
            >
              Browse Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipPlans;
