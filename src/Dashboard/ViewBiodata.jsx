import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loading from '../pages/Loading/Loading';
import { useEffect } from 'react';

const ViewBiodata = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'view-biodata';
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myBiodatas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['my-biodatas', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/bioDatas');
      return res.data.filter((item) => item.contactEmail === user?.email);
    },
  });

  const handleMakePremium = async () => {
    try {
      const res = await axiosSecure.post('/user/makePremium', {
        email: user?.email,
        name: user?.displayName,
        biodataId: myBiodatas[0]?.biodataId,
      });

      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'You are requested for  a new premium member!',
          confirmButtonColor: '#22c55e',
        });
        refetch();
      } else if (res.status === 409) {
        // Already requested for premium
        Swal.fire({
          icon: 'info',
          title: 'Already Requested!',
          text: 'You have already requested for premium.',
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

  if (isLoading) return <Loading></Loading>;

  if (myBiodatas.length === 0)
    return (
      <p className="text-center text-red-500">
        No biodata found for your account.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 relative h-full">
      <h2 className="text-2xl font-bold text-lime-600 mb-6 text-center">
        Your Submitted Biodatas ({myBiodatas.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myBiodatas.map((biodata) => (
          <div
            key={biodata._id}
            className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow"
          >
            <div className="flex gap-4 items-center mb-4">
              <img
                src={biodata?.profileImage}
                alt={biodata?.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-lime-500"
              />
              <div>
                <h3 className="text-xl font-semibold text-lime-500">
                  {biodata?.name}
                </h3>
                <p className="text-sm">Biodata ID: {biodata?.biodataId}</p>
                <p className="text-sm capitalize">
                  {biodata?.biodataType} | Age: {biodata?.age}
                </p>
                <p className="text-sm">Occupation: {biodata?.occupation}</p>
              </div>
            </div>

            <div className="text-sm space-y-1 mb-3">
              <p>
                <strong>Division:</strong> {biodata?.permanentDivision} →{' '}
                {biodata?.presentDivision}
              </p>
              <p>
                <strong>Height:</strong> {biodata?.height} |{' '}
                <strong>Weight:</strong> {biodata?.weight}
              </p>
              <p>
                <strong>Father:</strong> {biodata?.fathersName}
              </p>
              <p>
                <strong>Mother:</strong> {biodata?.mothersName}
              </p>
              <p>
                <strong>Contact:</strong> {biodata?.mobileNumber}
              </p>
              <p>
                <strong>Email:</strong> {biodata?.contactEmail}
              </p>
              <p className="text-lime-600 font-medium pt-1">
                Expected Partner: Age {biodata?.expectedPartnerAge}, Height{' '}
                {biodata?.expectedPartnerHeight}, Weight{' '}
                {biodata?.expectedPartnerWeight}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={user?.role?.role === 'premium'}
        onClick={() => handleMakePremium()}
        className="w-full absolute bottom-0 bg-lime-600 hover:bg-lime-700 text-white py-2 rounded transition"
      >
        {user?.role?.role === 'premium'
          ? 'Your are Premium user'
          : 'Request to Make Premium'}
      </button>
    </div>
  );
};

export default ViewBiodata;
