import { useEffect, useState } from 'react';
import { FaCrown, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ManageUsers = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'manage-user';
  }, []);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
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
                    <span className="inline-flex items-center gap-1 bg-lime-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <FaUserShield className="text-xs" /> Admin
                    </span>
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
    </div>
  );
};

export default ManageUsers;
