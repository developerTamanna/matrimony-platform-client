import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpdateBiodata = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'update-biodata';
  }, []);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/alluser/bioDatas/${id}`).then((res) => {
      setBio(res.data?.data);
      setLoading(false);
    });
  }, [axiosSecure, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      biodataType: form.biodataType.value,
      name: form.name.value,
      dateOfBirth: form.dateOfBirth.value,
      height: form.height.value,
      weight: form.weight.value,
      age: form.age.value,
      occupation: form.occupation.value,
      race: form.race.value,
      fathersName: form.fathersName.value,
      mothersName: form.mothersName.value,
      permanentDivision: form.permanentDivision.value,
      presentDivision: form.presentDivision.value,
      expectedPartnerAge: form.expectedPartnerAge.value,
      expectedPartnerHeight: form.expectedPartnerHeight.value,
      expectedPartnerWeight: form.expectedPartnerWeight.value,
      profileImage: form.profileImage.value,
      mobileNumber: form.mobileNumber.value,
    };

    try {
      const res = await axiosSecure.put(`/user/bioDatas/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Biodata updated successfully.', 'success');
        navigate('/dashboard/view-biodata');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Update failed.', 'error');
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-300">
        Loading...
      </p>
    );
  if (!bio)
    return (
      <p className="text-center py-10 text-red-500 dark:text-red-400">
        Biodata not found.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-lime-600 dark:text-lime-400 text-center mb-8">
        Update Your Biodata
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Select Biodata Type */}
        <select
          name="biodataType"
          defaultValue={bio.biodataType}
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
          required
        >
          <option value="" disabled>
            Select Biodata Type
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* All Text Inputs */}
        {[
          { name: 'name', placeholder: 'Name', value: bio.name },
          {
            name: 'profileImage',
            placeholder: 'Image URL',
            value: bio.profileImage,
          },
          { name: 'height', placeholder: 'Height', value: bio.height },
          { name: 'weight', placeholder: 'Weight', value: bio.weight },
          { name: 'age', placeholder: 'Age', value: bio.age },
          { name: 'race', placeholder: 'Race', value: bio.race },
          {
            name: 'fathersName',
            placeholder: "Father's Name",
            value: bio.fathersName,
          },
          {
            name: 'mothersName',
            placeholder: "Mother's Name",
            value: bio.mothersName,
          },
          {
            name: 'expectedPartnerAge',
            placeholder: 'Expected Partner Age',
            value: bio.expectedPartnerAge,
          },
          {
            name: 'expectedPartnerHeight',
            placeholder: 'Expected Partner Height',
            value: bio.expectedPartnerHeight,
          },
          {
            name: 'expectedPartnerWeight',
            placeholder: 'Expected Partner Weight',
            value: bio.expectedPartnerWeight,
          },
          {
            name: 'mobileNumber',
            placeholder: 'Mobile Number',
            value: bio.mobileNumber,
          },
        ].map((input) => (
          <input
            key={input.name}
            name={input.name}
            defaultValue={input.value}
            placeholder={input.placeholder}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
        ))}

        {/* Date of Birth */}
        <input
          type="date"
          name="dateOfBirth"
          defaultValue={bio.dateOfBirth}
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
          required
        />

        {/* Select Occupation */}
        <select
          name="occupation"
          defaultValue={bio.occupation}
          className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
          required
        >
          <option value="" disabled>
            Select Occupation
          </option>
          <option value="Student">Student</option>
          <option value="Job">Job</option>
          <option value="House wife">House wife</option>
        </select>

        {/* Division Dropdowns */}
        {['permanentDivision', 'presentDivision'].map((field) => (
          <select
            key={field}
            name={field}
            defaultValue={bio[field]}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          >
            <option value="" disabled>
              Select {field === 'permanentDivision' ? 'Permanent' : 'Present'}{' '}
              Division
            </option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattagram">Chattagram</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Barisal">Barisal</option>
            <option value="Khulna">Khulna</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Sylhet">Sylhet</option>
          </select>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 rounded-md transition"
        >
          Update Biodata
        </button>
      </form>
    </div>
  );
};

export default UpdateBiodata;
