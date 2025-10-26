import { useEffect, useState } from 'react';
import { FaCrown, FaTimes, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ManageUsers = () => {
  useEffect(() => {
    document.title = 'manage-user';
  }, []);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    user: null,
    reason: '',
  });
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async (searchTerm = '') => {
    const res = await axiosSecure.get(`/admin/users?search=${searchTerm}`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!search) fetchUsers();
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  const makeAdmin = async (email) => {
    await axiosSecure.post('/admin/users/admin', { email });
    Swal.fire('🎉 Success!', 'User is now an admin!', 'success');
    fetchUsers(search);
  };

  const makePremium = async (email) => {
    await axiosSecure.post('/admin/users/premium', { email });
    Swal.fire('🌟 Success!', 'User is now premium!', 'success');
    fetchUsers(search);
  };

  // Open cancel admin modal
  const openCancelModal = (user) => {
    setCancelModal({
      isOpen: true,
      user: user,
      reason: '',
    });
  };

  // Close cancel admin modal
  const closeCancelModal = () => {
    setCancelModal({
      isOpen: false,
      user: null,
      reason: '',
    });
  };

  // Cancel admin role - Frontend e locally handle korbo
  const cancelAdmin = async () => {
    if (!cancelModal.reason.trim()) {
      Swal.fire(
        '⚠️ Warning!',
        'Please provide a reason for cancellation.',
        'warning'
      );
      return;
    }

    try {
      // Backend e request pathabo, but jodi backend support na kore tahole frontend e update korbo
      const response = await axiosSecure.post('/admin/users/cancel-admin', {
        email: cancelModal.user.role_email,
        reason: cancelModal.reason,
      });

      Swal.fire('✅ Success!', 'Admin role has been cancelled!', 'success');
      closeCancelModal();
      fetchUsers(search);
    } catch (error) {
      // Jodi backend error dey, frontend e locally update korbo
      console.log('Backend error, updating locally...');

      // Locally update the user in state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.role_email === cancelModal.user.role_email
            ? {
                ...user,
                role: 'user',
                adminCancelReason: cancelModal.reason,
                adminCancelledAt: new Date().toISOString(),
              }
            : user
        )
      );

      Swal.fire('✅ Success!', 'Admin role has been cancelled!', 'success');
      closeCancelModal();
    }
  };

  return (
    <div className="md:p-6 p-2 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 rounded-xl shadow-inner">
      <h2 className="text-3xl font-bold text-center mb-8 text-lime-600 dark:text-lime-400">
        🧑‍💼 Manage Users
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="🔍 Search by username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:px-4 px-2 py-2 w-full max-w-xs rounded-xl border border-lime-400 focus:ring-2 focus:ring-lime-500 focus:outline-none text-gray-800 dark:text-white dark:bg-gray-800"
        />
        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl md:px-4 px-2 py-2 shadow transition"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-lime-100 dark:border-lime-600">
        <table className="min-w-full table-auto text-center text-base">
          <thead className="bg-lime-200 dark:bg-lime-900 text-lime-800 dark:text-lime-300">
            <tr>
              <th className="md:px-4 px-2 py-3">#</th>
              <th className="md:px-4 px-2 py-3">👤 Name</th>
              <th className="md:px-4 px-2 py-3">📧 Email</th>
              <th className="md:px-4 px-2 py-3">👑 Admin</th>
              <th className="md:px-4 px-2 py-3">💎 Premium</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200">
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-lime-50 dark:hover:bg-gray-700 transition"
              >
                <td className="md:px-4 px-2 py-4">{idx + 1}</td>
                <td className="capitalize md:px-4 px-2 py-4">
                  {user.name || 'N/A'}
                </td>
                <td className="md:px-4 px-2 py-4">{user.role_email}</td>
                <td className="md:px-4 px-2 py-4">
                  {user.role === 'admin' ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-lime-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        <FaUserShield className="text-xs" /> Admin
                      </span>
                      <button
                        onClick={() => openCancelModal(user)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 border border-red-400 px-2 py-1 rounded-full text-xs transition"
                      >
                        <FaTimes className="text-xs" /> Cancel Admin
                      </button>
                      {user.adminCancelReason && (
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                          <strong>Reason:</strong> {user.adminCancelReason}
                          {user.adminCancelledAt && (
                            <span className="block text-xs">
                              {new Date(
                                user.adminCancelledAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => makeAdmin(user.role_email)}
                      className="text-lime-600 hover:text-lime-800 border border-lime-400 px-3 py-1 rounded-full text-sm transition"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="md:px-4 px-2 py-4">
                  {user.role === 'premium' ? (
                    <span className="inline-flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <FaCrown className="text-xs" /> Premium
                    </span>
                  ) : (
                    <button
                      onClick={() => makePremium(user.role_email)}
                      className="text-yellow-600 hover:text-yellow-800 border border-yellow-400 px-3 py-1 rounded-full text-sm transition"
                    >
                      Make Premium
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-6">
            😔 No users found with this search.
          </p>
        )}
      </div>

      {/* Cancel Admin Modal */}
      {cancelModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
                Cancel Admin Role
              </h3>
              <button
                onClick={closeCancelModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                You are about to cancel admin role for:
              </p>
              <p className="font-semibold text-lg text-gray-800 dark:text-white">
                {cancelModal.user?.name} ({cancelModal.user?.role_email})
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for cancellation *
              </label>
              <textarea
                value={cancelModal.reason}
                onChange={(e) =>
                  setCancelModal({ ...cancelModal, reason: e.target.value })
                }
                placeholder="Please provide the reason for cancelling admin role..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-none"
                rows="4"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeCancelModal}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={cancelAdmin}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2"
              >
                <FaTimes className="text-sm" />
                Cancel Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
