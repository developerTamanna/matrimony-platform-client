import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AdminSuccessStoryTable = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'succeeded-table';
  }, []);
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axiosSecure.get('/admin/success-stories');
        setStories(res.data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      }
    };
    fetchStories();
  }, [axiosSecure]);

  const openModal = (story) => {
    setSelectedStory(story);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedStory(null);
  };

  return (
    <div className="max-w-6xl mx-auto md:px-4 md:py-10 py-5">
      <h2 className="text-3xl font-bold mb-6 text-lime-600 dark:text-lime-400 text-center">
        📝 All Success Stories
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-xl border border-lime-200 dark:border-lime-600">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-lime-100 dark:bg-lime-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Male Biodata ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Female Biodata ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {stories.map((story, index) => (
              <tr
                key={index}
                className="hover:bg-lime-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                  {story.selfbiotype === 'Male'
                    ? story.selfBiodataId
                    : story.partnerBiodataId}
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                  {story.partnerbiotype === 'Female'
                    ? story.partnerBiodataId
                    : story.selfBiodataId}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(story)}
                    className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1 rounded-md text-sm"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-lg border border-lime-300 dark:border-lime-700">
            <Dialog.Title className="text-xl font-bold text-lime-600 dark:text-lime-400 mb-2">
              ❤️ Success Story
            </Dialog.Title>
            {selectedStory && (
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <img
                  src={selectedStory.coupleImage}
                  alt="Couple"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p>
                  <strong>Male ID:</strong>
                  {selectedStory.selfbiotype === 'Male'
                    ? selectedStory.selfBiodataId
                    : selectedStory.partnerBiodataId}
                </p>
                <p>
                  <strong>Female ID:</strong>
                  {selectedStory.partnerbiotype === 'Female'
                    ? selectedStory.partnerBiodataId
                    : selectedStory.selfBiodataId}
                </p>
                <p>
                  <strong>Marriage Date:</strong> {selectedStory.marriageDate}
                </p>
                <p>
                  <strong>Story:</strong> “{selectedStory.story}”
                </p>
              </div>
            )}
            <div className="text-right mt-4">
              <button
                onClick={closeModal}
                className="text-sm text-lime-600 hover:underline"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminSuccessStoryTable;
