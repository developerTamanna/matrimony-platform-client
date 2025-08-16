import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'Is it FREE to create profile in BD Marriage?',
    answer: 'Yes, creating a basic profile in BD Marriage is completely free.',
  },
  {
    question: 'How can I create my profile on bdmarriage.com?',
    answer:
      'Register using your email, fill in your biodata, upload a photo, and submit.',
  },
  {
    question: 'How long does it take to create my profile?',
    answer:
      'It usually takes 5-10 minutes to fill out your profile completely.',
  },
  {
    question: 'Is it mandatory to add a phone number & email address?',
    answer:
      'Yes, providing both ensures better communication and account verification.',
  },
  {
    question: 'What is the advantage of verifying a mobile number?',
    answer:
      'It increases trust and allows other users to contact you after admin approval.',
  },
  {
    question: 'What is Profile ID?',
    answer:
      'Profile ID is your unique identification number used across the site.',
  },
  {
    question: 'How to login my account?',
    answer:
      'Click on Login, enter your registered email and password, or use Google sign-in.',
  },
  {
    question: 'Can I update my profile data?',
    answer:
      'Yes, after logging in, go to Dashboard > Edit Biodata to update your information.',
  },
  {
    question: 'Are my photos secure?',
    answer:
      'Yes, only logged-in users can see your photos, and privacy is our priority.',
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-lime-50 dark:bg-black py-12 px-4 md:px-20 transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        <span className="text-lime-600 dark:text-lime-400">
          ❓ Frequently Asked Questions
        </span>
      </h2>

      <div className="space-y-4 max-w-6xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-lime-200 dark:border-lime-600 rounded-xl overflow-hidden shadow-md"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex justify-between items-center px-5 py-4 font-medium text-left bg-white dark:bg-black text-gray-800 dark:text-lime-200 hover:bg-lime-100 dark:hover:bg-neutral-700 transition-all"
            >
              <span>{faq.question}</span>
              <span className="ml-4">
                {activeIndex === index ? (
                  <FaChevronUp className="text-lime-500" />
                ) : (
                  <FaChevronDown className="text-lime-500" />
                )}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-5 py-4 bg-lime-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-t border-lime-100 dark:border-lime-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
        Looking for something else?{' '}
        <a href="/faqs" className="text-lime-600 hover:underline">
          Go to detailed FAQs page →
        </a>
      </p>
    </section>
  );
}
