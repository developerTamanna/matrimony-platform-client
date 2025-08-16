import { useEffect } from "react";

const Contact = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'contact-us';
  }, []);
  return (
    <section className="bg-lime-50 dark:bg-[#121212] text-gray-800 dark:text-white pt-24 pb-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-lime-600 dark:text-lime-400">
          Contact Us
        </h2>

        <p className="text-center text-base md:text-lg">
          Have questions, suggestions, or need help? Feel free to reach out.
          We’re here to assist you.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
