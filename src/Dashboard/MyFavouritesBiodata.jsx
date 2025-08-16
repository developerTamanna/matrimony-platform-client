import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyFavouritesBiodata = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'my-favourite';
  }, []);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, setData] = useState([]);

  const getFavourite = async () => {
    if (!user?.email) return;

    try {
      const res = await axiosSecure.get(
        `/user/getfavourite?email=${user.email}`
      );
      setData(res.data);
    } catch (error) {
      console.error('Error fetching favourite biodata:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this from favourites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `/user/favourite/${id}?email=${user.email}`
        );
        if (res.data?.success) {
          /* setData((prev) => prev.filter((fav) => fav.biodataId !== biodataId)); */
          getFavourite();
          Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'This biodata has been removed from your favourites.',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (err) {
        console.error('❌ Failed to delete favourite:', err);
        Swal.fire('Error', 'Failed to delete favourite', 'error');
      }
    }
  };

  useEffect(() => {
    getFavourite();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-bold text-center text-lime-600 mb-6">
        My Favourite Biodatas
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No favourites found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-lime-500 rounded">
            <thead className="bg-lime-100 dark:bg-gray-800 text-black dark:text-white">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Biodata ID</th>
                <th className="px-4 py-2 border">Permanent Address</th>
                <th className="px-4 py-2 border">Occupation</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody className="text-center dark:text-white">
              {data.map((fav) => (
                <tr
                  key={fav._id}
                  className="hover:bg-lime-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2 border">{fav.name}</td>
                  <td className="px-4 py-2 border">{fav.biodataId}</td>
                  <td className="px-4 py-2 border">{fav.permanentDivision}</td>
                  <td className="px-4 py-2 border">{fav.occupation}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

export default MyFavouritesBiodata;
