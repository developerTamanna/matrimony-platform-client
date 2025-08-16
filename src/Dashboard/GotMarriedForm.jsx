import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const GotMarriedForm = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'got-married';
  }, []);
  const { register, setValue, handleSubmit, reset } = useForm();
  const [todayDate, setTodayDate] = useState('');
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [allBio, setAllBIo] = useState();
  useEffect(() => {
    const fetch = async () => {
      const getAllBio = await axiosSecure.get('/bioDatas');
      setAllBIo(getAllBio.data);
      const result = getAllBio.data.filter(
        (item) => item.contactEmail === user?.email
      );
      setValue('selfBiodataId', result[0]?.biodataId);
      setValue('selfbiotype', result[0]?.biodataType);
    };
    if (user) fetch();
    const today = new Date().toISOString().split('T')[0];
    setTodayDate(today);
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      console.log(data.partnerBiodataId);
      console.log(allBio);
      const partnerInfo = allBio.filter(
        (item) => item.biodataId === parseInt(data?.partnerBiodataId)
      );
      if (partnerInfo[0]?.biodataType === data.selfbiotype) {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: '❌ Can not get married with same gender ',
          confirmButtonColor: '#84cc16',
        });
        return 0;
      } else {
        console.log(partnerInfo);
        if (!partnerInfo || partnerInfo.length === 0) {
          throw new Error('partnerInfo not found');
        }
        data.partnerbiotype = partnerInfo[0]?.biodataType;
        console.log(data);

        const res = await axiosSecure.post('/user/success-stories', data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: '✅ Success story submitted!',
            confirmButtonColor: '#84cc16', // lime-500
          }).then(() => {
            navigate('/dashboard/sucsess'); // ✅ ঠিক path
          });
          reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: '❌ Failed to submit story',
            confirmButtonColor: '#84cc16',
          });
        }
      }
    } catch (error) {
      console.error('❌ Error submitting story:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || '❌ Something went wrong!',
        confirmButtonColor: '#84cc16',
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-lime-300 dark:border-lime-600">
      <h2 className="text-2xl font-bold text-center mb-6 text-lime-600 dark:text-lime-400">
        Share Your Success Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Your Biodata ID
          </label>
          <input
            type="number"
            readOnly
            {...register('selfBiodataId', { required: true })}
            placeholder="e.g., 1"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Partner Biodata ID
          </label>
          <input
            type="number"
            {...register('partnerBiodataId', { required: true })}
            placeholder="e.g., 2"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Couple Image Link
          </label>
          <input
            type="text"
            {...register('coupleImage', { required: true })}
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Marriage Date
          </label>
          <input
            type="date"
            defaultValue={todayDate}
            {...register('marriageDate', { required: true })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
            Your Story
          </label>
          <textarea
            rows="4"
            {...register('story', { required: true })}
            placeholder="Write something special..."
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default GotMarriedForm;
