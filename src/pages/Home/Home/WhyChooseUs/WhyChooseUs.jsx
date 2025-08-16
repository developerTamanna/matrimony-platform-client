import { FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="bg-lime-50 dark:bg-[#1a1a1a] py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            Why choose <span className="text-lime-600">Matrimony.com</span>
          </h2>

          {/* Feature List */}
          {[
            'Register for Free!',
            '100% human verified profiles',
            'Chat, Voice & Video calling',
            'Private, personalized, and highly confidential service',
            'Halal, safe and secured Matrimony site in Bangladesh',
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-black dark:text-gray-200"
            >
              <FaCheckCircle className="text-lime-600 mt-1" />
              <p>{text}</p>
            </div>
          ))}

          {/* Call to Action Button */}
          <button className="mt-4 bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-2 rounded shadow transition duration-300">
            Find Your Partner
          </button>
        </div>

        {/* Right Content (YouTube Embed) */}
        <div className="md:w-1/2 w-full">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <iframe
              className="w-full h-64 md:h-80 rounded-lg"
              src="https://www.youtube.com/embed/tTiyP2SNXdk"
              title="BD Marriage Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
