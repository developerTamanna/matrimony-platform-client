import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditBioData = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50 dark:bg-gray-950">
      <h2 className="text-3xl font-extrabold text-center text-lime-600 dark:text-lime-400 mb-8">
        Your Biodata
      </h2>

      {biodatas.map((bio) => (
        <div
          key={bio._id}
          className="bg-white dark:bg-gray-900 shadow-lg border border-lime-200 dark:border-lime-800 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-xl max-w-md w-full"
        >
          <img
            src={bio.profileImage}
            alt="profile"
            className="w-24 h-24 object-cover rounded-full border-4 border-lime-400 shadow-md mb-4"
          />
          <h3 className="text-xl font-semibold text-lime-600 dark:text-lime-400">
            {bio.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Biodata ID: <span className="font-medium">{bio.biodataId}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Type: {bio.biodataType} | Age: {bio.age}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Division: {bio.permanentDivision}
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => handleEdit(bio._id)}
              className="px-5 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 shadow-md transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(bio._id)}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditBioData;
