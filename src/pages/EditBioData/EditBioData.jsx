import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditBioData = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Edit-biodata';
  }, []);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [biodatas, setBiodatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axiosSecure.get('/bioDatas');
      const userBios = res.data.filter((bio) => bio.created_by === user?.email);
      setBiodatas(userBios);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch biodatas:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [axiosSecure, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this biodata?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/user/bioDatas/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Biodata deleted successfully.', 'success');
            fetchData();
          }
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete.', 'error');
        }
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-biodata/${id}`);
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-300">
        Loading...
      </p>
    );

  if (biodatas.length === 0) {
    return (
      <p className="text-center text-red-500 dark:text-red-400 py-10">
        You haven't created any biodata yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-extrabold text-center text-lime-600 dark:text-lime-400 mb-8">
        Your Biodata List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {biodatas.map((bio) => (
          <div
            key={bio._id}
            className="bg-white dark:bg-gray-900 shadow-md border border-lime-200 dark:border-lime-800 rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={bio.profileImage}
                alt="profile"
                className="w-20 h-20 object-cover rounded-full border-2 border-lime-400 shadow-sm"
              />
              <div className="text-gray-800 dark:text-gray-200 space-y-1">
                <h3 className="text-xl font-semibold text-lime-600 dark:text-lime-400">
                  {bio.name}
                </h3>
                <p className="text-sm">
                  Biodata ID:{' '}
                  <span className="font-medium">{bio.biodataId}</span>
                </p>
                <p className="text-sm">
                  Type: {bio.biodataType} | Age: {bio.age}
                </p>
                <p className="text-sm">Division: {bio.permanentDivision}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => handleEdit(bio._id)}
                className="px-4 py-1.5 bg-lime-600 text-white rounded-md hover:bg-lime-700 shadow"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bio._id)}
                className="px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 shadow"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditBioData;
