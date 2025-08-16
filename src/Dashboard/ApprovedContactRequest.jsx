import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useEffect } from 'react';

const ApprovedContactRequest = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Approve-contact';
  }, []);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['contactRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/contactRequests');
      console.log(res.data);
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ email, biodataId }) => {
      return await axiosSecure.post('/admin/approveContactRequest', {
        email,
        biodataId,
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Contact Approved!',
        text: 'User can now view the contact details.',
        confirmButtonColor: '#22c55e',
      });
      queryClient.invalidateQueries(['contactRequests']);
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to approve contact request.',
      });
    },
  });

  const handleApproveContact = (email, biodataId) => {
    approveMutation.mutate({ email, biodataId });
  };

  return (
    <div className="max-w-6xl mx-auto md:p-6 p-2 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-lime-600 dark:text-lime-400 text-center">
        Approved Contact Requests
      </h1>

      <div className="overflow-x-auto rounded-md border border-lime-200 dark:border-lime-800 shadow-sm">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-300">
            <tr>
              <th className="py-3 px-5 border border-lime-200 dark:border-lime-700 text-left">
                Name
              </th>
              <th className="py-3 px-5 border border-lime-200 dark:border-lime-700 text-left">
                Email
              </th>
              <th className="py-3 px-5 border border-lime-200 dark:border-lime-700 text-left">
                Biodata ID
              </th>
              <th className="py-3 px-5 border border-lime-200 dark:border-lime-700 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No contact requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-lime-50 dark:hover:bg-lime-800 transition-colors"
                >
                  <td className="py-3 px-5 border border-lime-100 dark:border-lime-700 text-gray-800 dark:text-gray-200">
                    {req.name}
                  </td>
                  <td className="py-3 px-5 border border-lime-100 dark:border-lime-700 text-gray-800 dark:text-gray-200">
                    {req.email}
                  </td>
                  <td className="py-3 px-5 border border-lime-100 dark:border-lime-700 text-gray-800 dark:text-gray-200">
                    {req.biodataId}
                  </td>
                  <td className="py-3 px-5 border border-lime-100 dark:border-lime-700 text-center">
                    <button
                      onClick={() =>
                        handleApproveContact(req.email, req.biodataId)
                      }
                      className="px-4 py-1.5 bg-lime-500 hover:bg-lime-600 text-white rounded-md font-medium shadow transition"
                    >
                      Approve Contact
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedContactRequest;
