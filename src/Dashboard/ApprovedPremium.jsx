import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ApprovedPremium = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Approved-premium';
  }, []);
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchRequests = async () => {
    const res = await axiosSecure.get('/admin/premiumRequests');
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleMakePremium = async (email, biodataId) => {
    try {
      await axiosSecure.post('/admin/acceptPremium', { email, biodataId });
      Swal.fire({
        icon: 'success',
        title: 'Premium Activated!',
        text: 'User is now a premium member.',
        confirmButtonColor: '#22c55e', // lime-500
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to make premium.',
        confirmButtonColor: '#22c55e',
      });
    }
  };

  return (
    <div className="md:p-6 p-2 bg-white dark:bg-gray-900 rounded-xl shadow-md min-h-screen transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-lime-600 dark:text-lime-400 text-center">
        ✅ Approved Premium Requests
      </h1>

      <div className="overflow-x-auto rounded-xl border border-lime-200 dark:border-lime-600">
        <table className="min-w-full bg-white dark:bg-gray-800 text-sm md:text-base">
          <thead className="bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-300">
            <tr>
              <th className="py-3 px-4 border">👤 Name</th>
              <th className="py-3 px-4 border">📧 Email</th>
              <th className="py-3 px-4 border">🆔 Biodata ID</th>
              <th className="py-3 px-4 border text-center">🎯 Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="hover:bg-lime-50 dark:hover:bg-gray-700 transition duration-300"
              >
                <td className="py-2 px-4 border text-gray-800 dark:text-gray-100">
                  {req.premium_name}
                </td>
                <td className="py-2 px-4 border text-gray-700 dark:text-gray-200">
                  {req.premium_email}
                </td>
                <td className="py-2 px-4 border text-gray-600 dark:text-gray-300">
                  {req.biodataId}
                </td>
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() =>
                      handleMakePremium(req.premium_email, req.biodataId)
                    }
                    className="bg-lime-500 hover:bg-lime-600 text-white px-5 py-1.5 rounded-full shadow-sm transition"
                  >
                    Make Premium
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  😔 No premium requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
