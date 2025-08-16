import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const AdminDashboard = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'Admin-home';
  }, []);
  const [stats, setStats] = useState(null);
  const axiosSecure = useAxiosSecure();

  const [outerRadius, setOuterRadius] = useState(130);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setOuterRadius(70);
      } else {
        setOuterRadius(130);
      }
    };

    updateRadius(); // প্রথমবার কল
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);


  useEffect(() => {
    axiosSecure
      .get('/admin/addmin-dashboard-counter')
      .then((res) => {
        setStats(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error('Error loading stats:', err));
  }, []);

  const COLORS = ['#22c55e', '#fbbf24', '#3b82f6', '#ec4899', '#9460e0'];

  const dailyTrendData = [
    {
      date: 'Jul 1',
      users: 5,
      products: 3,
      pending: 2,
      reviews: 4,
      accepted: 1,
    },
    {
      date: 'Jul 2',
      users: 8,
      products: 4,
      pending: 3,
      reviews: 6,
      accepted: 2,
    },
    {
      date: 'Jul 3',
      users: 6,
      products: 6,
      pending: 2,
      reviews: 8,
      accepted: 3,
    },
    {
      date: 'Jul 4',
      users: 10,
      products: 8,
      pending: 3,
      reviews: 12,
      accepted: 5,
    },
    {
      date: 'Jul 5',
      users: 7,
      products: 5,
      pending: 2,
      reviews: 5,
      accepted: 4,
    },
    {
      date: 'Jul 6',
      users: 12,
      products: 7,
      pending: 4,
      reviews: 9,
      accepted: 6,
    },
    {
      date: 'Jul 7',
      users: 9,
      products: 6,
      pending: 1,
      reviews: 7,
      accepted: 5,
    },
  ];

  /*   const data = demoData; */

  const pieData = [
    { name: 'Premium Biodata', value: stats?.premium },
    { name: 'Female Biodata', value: stats?.female },
    { name: 'Male Biodata', value: stats?.male },
    { name: 'Total Biodata', value: stats?.totalbio },
    { name: 'Total Revenue', value: stats?.totalrevenue },
  ];
  if (!stats) return <p className="text-center mt-10">Loading stats...</p>;

  return (
    <section className="max-w-7xl w-full mx-auto md:px-6 px-2 md:py-12 py-8 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white tracking-tight">
        📊 Admin Dashboard Overview
      </h2>

      <div className="w-full h-[280px] sm:h-[400px] overflow-auto mb-10 rounded-lg bg-white dark:bg-gray-800 shadow-md md:p-4 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              isAnimationActive={true}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px' }} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="w-full h-[400px] mb-10 rounded-lg bg-white dark:bg-gray-800 shadow-md p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" name="New Users" />
            <Line type="monotone" dataKey="products" stroke="#22c55e" name="New Products" />
            <Line type="monotone" dataKey="pending" stroke="#fbbf24" name="Pending Products" />
            <Line type="monotone" dataKey="reviews" stroke="#ec4899" name="Reviews" />
            <Line type="monotone" dataKey="accepted" stroke="#10b981" name="Accepted Products" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg md:p-6 p-2 hover:scale-105 transform transition">
          <p className="text-3xl font-extrabold text-green-500">{`$ ${stats.totalrevenue}`}</p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Total Revenue</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg md:p-6 p-2 hover:scale-105 transform transition">
          <p className="text-3xl font-extrabold text-blue-500">
            {stats.totalbio}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Total Biodata</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg md:p-6 p-2 hover:scale-105 transform transition">
          <p className="text-3xl font-extrabold text-pink-500">
            {stats.premium}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Premium Biodata
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg md:p-6 p-2 hover:scale-105 transform transition">
          <p className="text-3xl font-extrabold text-yellow-500">
            {stats.female}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Female Biodata
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg md:p-6 p-2 hover:scale-105 transform transition">
          <p className="text-3xl font-extrabold text-yellow-500">
            {stats.male}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Male Biodata</p>
        </div>
      </div>
    </section>
  );
};

{
  /* export default AdminStatsContent;

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Card title="Total Biodata" value={stats.totalbio} />
        <Card title="Male Biodata" value={stats.male} />
        <Card title="Female Biodata" value={stats.female} />
        <Card title="Premium Biodata" value={stats.premium} />
        <Card title="Total Revenue" value={`৳ ${stats.totalrevenue}`} />
      </div> */
}

/* const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-6 text-center border border-gray-200">
    <h2 className="text-xl font-bold text-gray-700">{title}</h2>
    <p className="text-3xl font-semibold text-green-600 mt-2">{value}</p>
  </div>
); */

export default AdminDashboard;
