import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const BiodataDetails = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'biodata-details';
  }, []);

  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Assuming role comes from userContext
  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get('/bioDatas').then((res) => {
      const current = res.data.find((bio) => bio._id === id);
      setBiodata(current);

      // Show max 3 similar biodatas by gender
      const filtered = res.data
        .filter(
          (bio) =>
            bio.biodataType === current?.biodataType && bio._id !== current?._id
        )
        .slice(0, 3);
      setSimilarBiodatas(filtered);
    });
    window.scrollTo(0, 0);
  }, [axiosSecure, id]);

  // handlePay

  const handlePay = (id) => {
    if (user.role.role === 'admin') {
      toast.error("Admin can't do this");
      return;
    }
    console.log('proceed to payment for', id);
    navigate(`/dashboard/payment/${id}`); // ✅ Correct path
  };

  //handleFavourite
  const handleFavourite = async (id) => {
    try {
      if (user.role.role === "admin") { toast.error("Admin can't do this"); return}
      const res = await axiosSecure.post('/alluser/favourite', {
        email: user?.email,
        id: id,
      });
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'successfully added Favourite!',
          confirmButtonColor: '#22c55e',
        });
      } else if (res.status === 409) {
        // Already requested for premium
        Swal.fire({
          icon: 'info',
          title: 'Already favourite!',
          text: 'You all-ready added to favourite.',
          confirmButtonColor: '#0ea5e9',
        });
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: err.response?.data?.message || err.message,
        confirmButtonColor: '#d33',
      });
    }
  };

  if (!biodata)
    return <p className="text-center py-10">Loading biodata details...</p>;

  return (
    <div className=" w-full max-w-5xl mx-auto px-2 sm:px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-lime-600 dark:text-lime-400 mb-6">
        Biodata Details
      </h1>

      {/* 🔳 Details Card */}
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 grid md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center items-center">
          <img
            src={biodata.profileImage}
            alt={biodata.name}
            className="w-full max-w-sm h-72 object-contain rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2"
          />
        </div>

        <div className="space-y-2 text-gray-800 dark:text-gray-200">
          <p>
            <strong>Name:</strong> {biodata.name}
          </p>
          <p>
            <strong>Gender:</strong> {biodata.biodataType}
          </p>
          <p>
            <strong>Age:</strong> {biodata.age}
          </p>
          <p>
            <strong>Date of Birth:</strong> {biodata.dateOfBirth}
          </p>
          <p>
            <strong>Height:</strong> {biodata.height}
          </p>
          <p>
            <strong>Weight:</strong> {biodata.weight}
          </p>
          <p>
            <strong>Race:</strong> {biodata.race}
          </p>
          <p>
            <strong>Occupation:</strong> {biodata.occupation}
          </p>
          <p>
            <strong>Father's Name:</strong> {biodata.fathersName}
          </p>
          <p>
            <strong>Mother's Name:</strong> {biodata.mothersName}
          </p>
          <p>
            <strong>Permanent Division:</strong> {biodata.permanentDivision}
          </p>
          <p>
            <strong>Present Division:</strong> {biodata.presentDivision}
          </p>
          <p>
            <strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}
          </p>
          <p>
            <strong>Expected Partner Height:</strong>{' '}
            {biodata.expectedPartnerHeight}
          </p>
          <p>
            <strong>Expected Partner Weight:</strong>{' '}
            {biodata.expectedPartnerWeight}
          </p>

          {/* 🔒 Contact Info */}
          {user?.role?.role === 'premium' ? (
            <div className="pt-2">
              <p>
                <strong>Contact Email:</strong> {biodata.contactEmail}
              </p>
              <p>
                <strong>Mobile Number:</strong> {biodata.mobileNumber}
              </p>
            </div>
          ) : (
            // <button
            //   onClick={() => navigate(`/checkout/${biodata.biodataId}`)}
            //   className="mt-4 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded transition"
            // >
            //   Request Contact Info
            // </button>
            <button
              onClick={() => handlePay(biodata._id)}
              className="mt-4 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded transition"
            >
              Request Contact Info
            </button>
          )}

          {/* ❤️ Add to Favourite */}
          <button
            onClick={() => handleFavourite(biodata._id)}
            className="mt-3 ml-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded"
          >
            Add to Favourites
          </button>
        </div>
      </div>

      {/* 👥 Similar Biodatas */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-lime-600 dark:text-lime-400 mb-4">
          Similar Biodatas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarBiodatas.map((bio) => (
            <div
              key={bio._id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg shadow bg-white dark:bg-gray-900 p-4"
            >
              <img
                src={bio.profileImage}
                alt={bio.name}
                className="h-40 w-full object-contain bg-gray-100 dark:bg-gray-800 p-2 rounded mb-3"
              />
              <h3 className="text-lg font-bold text-lime-600 dark:text-lime-400">
                {bio.name}
              </h3>
              <p className="text-sm dark:text-gray-300">
                <strong>Gender:</strong> {bio.biodataType}
              </p>
              <p className="text-sm dark:text-gray-300">
                <strong>Age:</strong> {bio.age}
              </p>
              <p className="text-sm dark:text-gray-300">
                <strong>Occupation:</strong> {bio.occupation}
              </p>

              <button
                onClick={() => navigate(`/biodata/${bio._id}`)}
                className="mt-3 w-full text-white bg-lime-600 hover:bg-lime-700 px-3 py-1 rounded"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
