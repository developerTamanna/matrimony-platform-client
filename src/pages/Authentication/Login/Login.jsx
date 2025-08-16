import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router'; // ✅ Make sure to use react-router-dom
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';

const Login = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'login';
  }, []);
  const { signIn, googleSignIn, loading, setLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard'; // ✅ রিডাইরেকশন

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        reset();
        navigate(from, { replace: true }); // ✅ Redirect to previous page or dashboard
      })
      .catch((error) => {
        console.error('Login Error:', error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Google Login Error:', error.message);
      });
  };

  // Optional: Effect to keep user logged in even after refresh handled in AuthProvider
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white  md:px-8 border border-lime-200">
      <div className="w-full  sm:max-w-md md:max-w-lg lg:max-w-md p-2  md:p-10 rounded-2xl shadow-xl border border-lime-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-lime-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              type="email"
              id="email"
              placeholder="you@example.com"
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
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                  message:
                    'Password must include at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be at least 6 characters',
                },
              })}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="text-gray-500">or</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition duration-200"
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {loading ? 'Please wait...' : 'Continue with Google'}
        </button>

        {/* 🔗 Register Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-lime-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
