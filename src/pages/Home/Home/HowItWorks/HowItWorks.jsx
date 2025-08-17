import { Link } from 'react-router';
import img1 from '../../../../assets/Create-profile.png';
import img2 from '../../../../assets/Search-partner.png';
import img3 from '../../../../assets/communication.png';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Create Your Profile',
      description:
        'Create your detail profile, add photos and describe your partner preference',
      icon: img1,
      link: 'biodatas',
    },
    {
      title: 'Search Your Partner',
      description:
        'Search your preferred partner by location, education, interest and so on',
      icon: img2,
      link: '/all-biodatas',
    },
    {
      title: 'Start Communication',
      description:
        'Start communication with suitable profiles by sending message & emails',
      icon: img3,
      link: '/login',
    },
  ];

  return (
    <section className="py-16 bg-lime-50 dark:bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col text-center">
          <h2 className="text-4xl font-extrabold text-lime-700 dark:text-lime-400 mb-4">
            How Matrimony{' '}
            <span className="text-gray-900 dark:text-white">works</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Get started in Matrimony.com in 3 easy steps
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, index) => (
            <Link to={step.link} key={index} className="group">
              <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-28 h-28 mb-6 group-hover:scale-110 transform transition-transform duration-300"
                />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center max-w-xs">
                  {step.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
