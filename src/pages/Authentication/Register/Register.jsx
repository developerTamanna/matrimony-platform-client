import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router'; // react-router-dom নিশ্চিত করো
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';

const Register = () => {
   // dynamic path change
  useEffect(() => {
    document.title = 'Register';
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;

    createUser(email, password)
      .then((res) => {
        updateUserProfile(name, photo)
          .then(() => {
            toast.success('Registration successful! 🎉');
            reset();
            navigate('/');
          })
          .catch(() => {
            toast.error('Profile update failed!');
          });
      })
      .catch((err) => {
        toast.error(err.message || 'Registration failed');
      });
  };

  // Google SignIn Handler
  const handleGoogleLogin = () => {
    googleSignIn()
      .then(() => {
        toast.success('Google login successful! 🎉');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.message || 'Google login failed');
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-lime-50 md:px-4 p-2">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-lime-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-gray-700 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Choose a strong password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                  message:
                    'Password must include at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be at least 6 characters',
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label
              htmlFor="photo"
              className="block mb-1 text-gray-700 font-medium"
            >
              Photo URL
            </label>
            <input
              type="url"
              id="photo"
              placeholder="https://your-photo-link.com"
              {...register('photo', {
                required: 'Photo URL is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Must be a valid URL',
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.photo && (
              <p className="text-sm text-red-500 mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center gap-2">
          <span className="h-px bg-gray-300 flex-grow"></span>
          <span className="text-gray-500">or</span>
          <span className="h-px bg-gray-300 flex-grow"></span>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-lime-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
