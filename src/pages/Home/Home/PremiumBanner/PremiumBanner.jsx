import { useEffect, useState } from 'react';
import { FaMars, FaVenus } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PremiumBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPremium = async () => {
      try {
        const res = await axiosSecure.get('/getpremium');
        const sorted = [...res.data].sort((a, b) => {
          const ageA = parseInt(a.age);
          const ageB = parseInt(b.age);
          return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
        });
        setData(sorted);
      } catch (err) {
        console.error('Failed to fetch premium members:', err);
      }
    };

    fetchPremium();
  }, []);

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => {
        const ageA = parseInt(a.age);
        const ageB = parseInt(b.age);
        return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
      });
      setData(sorted);
    }
  }, [sortOrder]);

  const handleViewProfile = (id) => {
    if (!user?.email) return navigate('/login');
    navigate(`/biodata/${id}`);
  };

  return (
    <section className="bg-gradient-to-br from-lime-50 to-lime-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-bold text-lime-600 dark:text-lime-400">
            Premium Members
          </h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-lime-400 dark:border-lime-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
          >
            <option value="asc">Sort by Age (Asc)</option>
            <option value="desc">Sort by Age (Desc)</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((member) => (
            <div
              key={member._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 text-center border-2 border-lime-200 dark:border-lime-700"
            >
              {/* Profile Image + Icon */}
              <div className="flex justify-center relative">
                <img
                  src={member.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-lime-300 dark:ring-lime-500"
                />
                <span
                  className="absolute top-0 right-0 text-xl text-lime-600 dark:text-lime-400"
                  title={member.biodataType}
                >
                  {member.biodataType?.toLowerCase() === 'male' ? (
                    <FaMars />
                  ) : (
                    <FaVenus />
                  )}
                </span>
              </div>

              {/* Info */}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Biodata ID: {member.biodataId}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
                {member.name || 'Anonymous'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Age: {member.age} | {member.biodataType}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Occupation: {member.occupation}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Division: {member.permanentDivision}
              </p>

              {/* Badge */}
              <div className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-lime-100 dark:bg-lime-800 text-lime-700 dark:text-lime-100 rounded-full">
                🌟 Premium Member
              </div>

              {/* Button */}
              <button
                onClick={() => handleViewProfile(member._id)}
                className="mt-4 w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold px-5 py-2 rounded-lg transition shadow"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumBanner;
