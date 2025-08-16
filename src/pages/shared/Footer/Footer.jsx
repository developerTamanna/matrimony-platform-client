// Footer.jsx
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-lime-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 transition-colors duration-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-xl font-bold text-lime-600 dark:text-lime-400 mb-3">
            Matrimony Platform
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connecting hearts with trust and care. Begin your journey today.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-biodatas"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                Biodatas
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-2">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                // to="/faq"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                // to="/privacy"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                // to="/terms"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                // to="/help"
                className="hover:text-lime-600 dark:hover:text-lime-400"
              >
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Follow Us */}
        <div>
          <h3 className="font-semibold text-lime-600 dark:text-lime-400 mb-2">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-600 dark:hover:text-lime-400"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-600 dark:hover:text-lime-400"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-lime-600 dark:hover:text-lime-400"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:support@matrimony.com"
              className="hover:text-lime-600 dark:hover:text-lime-400"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 text-center py-4 text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Matrimony Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
