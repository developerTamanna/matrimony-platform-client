import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyContactRequests = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'my-contact-request';
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    if (!user?.email) return;

    try {
      const res = await axiosSecure.get(
        `/user/contact-requests?email=${user.email}`
      );
      setRequests(res.data);
    } catch (error) {
      console.error('❌ Failed to fetch contact requests:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this contact request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/user/contact-requests/${id}`);
        if (res.data?.success) {
          fetchRequests();
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Contact request deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error('❌ Delete failed:', err);
        Swal.fire('Error', 'Failed to delete contact request', 'error');
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-lime-600 dark:text-lime-400 mb-8">
        My Contact Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 italic">
          No contact requests found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-lime-300 dark:border-lime-700 shadow-sm">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-300 font-semibold uppercase">
              <tr>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                  #
                </th>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                  Name
                </th>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                  Biodata ID
                </th>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                  Status
                </th>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                  Mobile No
                </th>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                  Email
                </th>
                <th className="px-5 py-3 border border-lime-300 dark:border-lime-700 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center text-gray-800 dark:text-gray-100">
              {requests.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-lime-50 dark:hover:bg-lime-800 transition-colors"
                >
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                    {index + 1}
                  </td>
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                    {item.name}
                  </td>
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                    {item.biodataId}
                  </td>
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700 capitalize font-medium">
                    <span
                      className={
                        item.status.toLowerCase() === 'approved'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-yellow-600 dark:text-yellow-400'
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700">
                    {item.status.toLowerCase() === 'approved'
                      ? item.mobile
                      : '—'}
                  </td>
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700 truncate max-w-xs">
                    {item.status.toLowerCase() === 'approved'
                      ? item.email
                      : '—'}
                  </td>
                  <td className="px-5 py-3 border border-lime-300 dark:border-lime-700 text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContactRequests;
