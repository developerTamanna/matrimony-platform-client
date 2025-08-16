import { useEffect } from "react";

const AboutUs = () => {
  // dynamic path change
  useEffect(() => {
    document.title = 'About-us';
  }, []);
  return (
    <section className="bg-lime-50 dark:bg-[#121212] text-gray-800 dark:text-white pt-24 pb-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold text-lime-600 dark:text-lime-400 mb-4">
          About Matrimony
        </h2>
        <p className="text-lg md:text-xl leading-relaxed">
          Matrimony is a modern matchmaking platform built with care using the
          MERN stack. Our mission is to help people find their life partners in
          a respectful, safe, and user-friendly environment.
        </p>
        <p className="text-base md:text-lg">
          Whether you're a student, a professional, or someone searching for a
          perfect companion, we aim to make your journey easier. We focus on
          real biodatas, verified profiles, and smart filtering systems to
          ensure better matches.
        </p>
        <p className="text-base md:text-lg">
          With secure authentication, contact request features, premium
          membership, and success story sharing — we are redefining traditional
          matrimony in a digital age.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
