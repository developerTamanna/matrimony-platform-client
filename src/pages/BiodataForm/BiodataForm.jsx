import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const inputField = [
  {
    label: 'Biodata Type',
    type: 'select',
    name: 'biodataType',
    options: ['Male', 'Female'],
  },
  { label: 'Name', type: 'text', name: 'name' },
  { label: 'Profile Image URL', type: 'text', name: 'profileImage' },
  { label: 'Date of Birth', type: 'date', name: 'dateOfBirth' },
  {
    label: 'Height',
    type: 'select',
    name: 'height',
    options: ['5\'0"', '5\'2"', '5\'4"', '5\'6"', '5\'8"', '6\'0"'],
  },
  {
    label: 'Weight',
    type: 'select',
    name: 'weight',
    options: ['40kg', '50kg', '60kg', '70kg'],
  },
  { label: 'Age', type: 'number', name: 'age' },
  {
    label: 'Occupation',
    type: 'select',
    name: 'occupation',
    options: ['Student', 'Job', 'Housewife'],
  },
  {
    label: 'Race (Skin Color)',
    type: 'select',
    name: 'race',
    options: ['Fair', 'Medium', 'Dark'],
  },
  { label: "Father's Name", type: 'text', name: 'fathersName' },
  { label: "Mother's Name", type: 'text', name: 'mothersName' },
  {
    label: 'Permanent Division',
    type: 'select',
    name: 'permanentDivision',
    options: [
      'Dhaka',
      'Chattagram',
      'Rangpur',
      'Barisal',
      'Khulna',
      'Mymensingh',
      'Sylhet',
    ],
  },
  {
    label: 'Present Division',
    type: 'select',
    name: 'presentDivision',
    options: [
      'Dhaka',
      'Chattagram',
      'Rangpur',
      'Barisal',
      'Khulna',
      'Mymensingh',
      'Sylhet',
    ],
  },
  { label: 'Expected Partner Age', type: 'number', name: 'expectedPartnerAge' },
  {
    label: 'Expected Partner Height',
    type: 'select',
    name: 'expectedPartnerHeight',
    options: ['5\'0"', '5\'4"', '5\'6"', '6\'0"'],
  },
  {
    label: 'Expected Partner Weight',
    type: 'select',
    name: 'expectedPartnerWeight',
    options: ['40kg', '50kg', '60kg', '70kg'],
  },
  {
    label: 'Contact Email',
    type: 'email',
    name: 'contactEmail',
    readonly: true,
  },
  { label: 'Mobile Number', type: 'text', name: 'mobileNumber' },
];

const BiodataForm = ({ defaultValues = {} }) => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Biodata-Form';
  }, []);
  const { user } = useAuth();
  const email = user?.email || '';
  const axiosSecure = useAxiosSecure();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
      contactEmail: email,
    },
  });

  useEffect(() => {
    const checkBiodata = async () => {
      try {
        const res = await axiosSecure.get('/bioDatas');
        const exists = res.data.find((data) => data.contactEmail === email);
        if (exists) {
          setAlreadySubmitted(true);
        }
      } catch (error) {
        console.error('Error checking biodata:', error);
      }
    };

    if (email) {
      checkBiodata();
    }
  }, [email, axiosSecure]);

  const onSubmit = async (data) => {
    try {
      if (user.role.role === 'admin') {
        toast.error("Admin can't do this");
        return;
      }
      const biodataToSend = {
        ...data,
        created_by: email,
        payment_status: 'unpaid',
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post('/alluser/bioDatas', biodataToSend);

      if (res.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Your biodata has been submitted successfully.',
          icon: 'success',
          confirmButtonColor: '#22c55e',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard/view-biodata');
          }
        });
        setAlreadySubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting biodata:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while submitting your biodata.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 shadow-xl rounded-xl mt-6 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-center text-lime-600 dark:text-lime-400 mb-10">
        Create Your Biodata
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {inputField.map((field, index) => (
          <div key={index}>
            <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-gray-200">
              {field.label}
            </label>

            {field.type === 'select' ? (
              <select
                {...register(field.name, {
                  required: !field.readonly && `${field.label} is required`,
                })}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="">Select</option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                {...register(field.name, {
                  required: !field.readonly && `${field.label} is required`,
                })}
                readOnly={field.readonly || false}
                className={`w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-500 ${
                  field.readonly
                    ? 'bg-gray-100 dark:bg-neutral-700 cursor-not-allowed'
                    : 'bg-white dark:bg-neutral-800'
                } text-gray-800 dark:text-gray-100`}
              />
            )}

            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="md:col-span-2 text-center mt-6">
          {alreadySubmitted ? (
            <p className="text-red-600 font-semibold">
              You have already submitted your biodata.
            </p>
          ) : (
            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-700 text-white px-8 py-3 rounded-md font-semibold transition"
            >
              Save & Publish Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BiodataForm;
