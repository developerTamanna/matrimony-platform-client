import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lime-50 dark:bg-[#121212] text-gray-800 dark:text-white px-4">
      <h1 className="text-9xl font-extrabold text-lime-600 dark:text-lime-400 mb-6">
        404
      </h1>
      <p className="text-2xl md:text-3xl font-semibold mb-4">
        Oops! Page Not Found
      </p>
      <p className="text-center max-w-md mb-8 text-gray-700 dark:text-gray-300">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
