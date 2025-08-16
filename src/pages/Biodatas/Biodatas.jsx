import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const divisions = [
  'Dhaka',
  'Chattagram',
  'Rangpur',
  'Barisal',
  'Khulna',
  'Mymensingh',
  'Sylhet',
];

const Biodatas = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'All-biodata';
  }, []);
  const axiosSecure = useAxiosSecure();
  const [gender, setGender] = useState('');
  const [division, setDivision] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: pagedBiodatas = { biodatas: [], count: 0 }, isLoading } =
    useQuery({
      queryKey: ['biodatas', currentPage],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/pagination?page=${currentPage}&limit=${itemsPerPage}`
        );
        return res.data;
      },
    });

  if (isLoading) {
    return (
      <div className="text-center text-lg font-semibold text-lime-600">
        Loading...
      </div>
    );
  }

  const filtered = pagedBiodatas.biodatas
    .filter((bio) => {
      if (gender && bio.biodataType !== gender) return false;
      if (division && bio.permanentDivision !== division) return false;
      if (minAge && +bio.age < +minAge) return false;
      if (maxAge && +bio.age > +maxAge) return false;
      return true;
    })
    .sort((a, b) => (sortOrder === 'asc' ? +a.age - +b.age : +b.age - +a.age));

  const totalPages = Math.ceil(pagedBiodatas.count / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-lime-600 dark:text-lime-400 mb-10">
        All Biodatas ({pagedBiodatas.count})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Section */}
        <div className="lg:w-1/4 w-full border border-lime-200 dark:border-lime-600 p-6 rounded-xl shadow bg-white dark:bg-gray-900">
          <h2 className="text-xl font-semibold mb-4 text-lime-600 dark:text-lime-400">
            Filter Options
          </h2>

          <div className="flex flex-col gap-4">
            <select
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="">All Divisions</option>
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Age"
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max Age"
              className="px-3 py-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />

            <select
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Sort by Age: Low to High</option>
              <option value="desc">Sort by Age: High to Low</option>
            </select>
          </div>
        </div>

        {/* Biodata Cards */}
        <div className="lg:w-3/4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((bio) => (
              <div
                key={bio._id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-lime-200 dark:border-lime-600 p-6 shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={bio.profileImage}
                  alt={bio.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-lime-300 dark:border-lime-500 mb-4"
                />
                <h3 className="text-lg font-semibold text-center text-lime-700 dark:text-lime-400 mb-1">
                  {bio.name}
                </h3>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-2">
                  Biodata ID: {bio.biodataId}
                </p>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p>
                    <strong>Gender:</strong> {bio.biodataType}
                  </p>
                  <p>
                    <strong>Division:</strong> {bio.permanentDivision}
                  </p>
                  <p>
                    <strong>Age:</strong> {bio.age}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {bio.occupation}
                  </p>
                </div>
                <Link
                  to={`/biodata/${bio._id}`}
                  className="block mt-4 bg-lime-600 hover:bg-lime-700 text-white text-center py-2 px-4 rounded-md transition"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
            <button
              className="px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;

              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-md border transition ${
                      currentPage === page
                        ? 'bg-lime-600 text-white'
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white'
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }

              if (
                (page === currentPage - 2 && page > 2) ||
                (page === currentPage + 2 && page < totalPages - 1)
              ) {
                return (
                  <span key={page} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }

              return null;
            })}

            <button
              className="px-3 py-2 border rounded-md text-gray-700 dark:text-gray-300 disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
