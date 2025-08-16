import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaFemale, FaHeart, FaMale, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CountupSection = () => {
  const [counts, setCounts] = useState({
    totalbio: 0,
    male: 0,
    female: 0,
    marriages: 0,
  });

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // ✅ AOS animation init
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
    });

    // ✅ API Call
    axiosSecure
      .get('/count-up')
      .then((res) => {
        setCounts({
          totalbio: res.data.totalbio || 0,
          male: res.data.male || 0,
          female: res.data.female || 0,
          marriages: res.data.successStories || 0,
        });
      })
      .catch((err) => {
        console.error('❌ Error fetching count data:', err);
      });
  }, [axiosSecure]);

  // ✅ All card info with icon + delay
  const items = [
    {
      label: 'Total Biodata',
      value: counts.totalbio,
      icon: <FaUsers size={30} />,
      delay: 0,
    },
    {
      label: 'Boys Biodata',
      value: counts.male,
      icon: <FaMale size={30} />,
      delay: 100,
    },
    {
      label: 'Girls Biodata',
      value: counts.female,
      icon: <FaFemale size={30} />,
      delay: 200,
    },
    {
      label: 'Marriages Completed',
      value: counts.marriages,
      icon: <FaHeart size={30} />,
      delay: 300,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-8 lg:px-16 bg-lime-50 dark:bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          data-aos="fade-up"
          data-aos-delay={item.delay}
          className="shadow-xl p-6 rounded-2xl bg-white dark:bg-gray-900 transition duration-300 hover:scale-105 hover:shadow-lime-200 dark:hover:shadow-lime-500 text-center"
        >
          <div className="flex justify-center items-center text-lime-600 dark:text-lime-400 mb-3">
            {item.icon}
          </div>
          <h2 className="text-4xl font-extrabold text-lime-600 dark:text-lime-400">
            <CountUp end={item.value} duration={2} />
          </h2>
          <p className="text-lg font-medium mt-2 text-gray-700 dark:text-gray-300">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountupSection;
