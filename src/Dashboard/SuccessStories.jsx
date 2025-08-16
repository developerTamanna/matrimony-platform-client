import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaHeart } from 'react-icons/fa';

const SuccessStories = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'successStories';
  }, []);
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosSecure.get('/success-stories');
        setStories(res.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, [axiosSecure]);

  if (stories.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-10">
        No success stories yet.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-lime-600 dark:text-lime-400 flex items-center justify-center gap-2">
        <FaHeart className="text-lime-500" />
        Success Stories
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 border border-lime-200 dark:border-lime-700 rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5 flex flex-col"
          >
            <div className="relative mb-4">
              <img
                src={story.coupleImage}
                alt="Couple"
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />
              <span className="absolute bottom-2 right-2 bg-lime-500 text-white text-xs px-3 py-1 rounded-full shadow">
                ❤️ Love Story
              </span>
            </div>

            <h3 className="font-semibold text-lg text-lime-700 dark:text-lime-400 mb-1">
              Biodata ID: {story.selfBiodataId} & {story.partnerBiodataId}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              📅 Marriage Date:{' '}
              <span className="font-medium">{story.marriageDate}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
              “{story.story}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
