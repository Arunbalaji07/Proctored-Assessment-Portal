import React from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../assets/logo.png'; // Replace with your logo path

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <img src={""} alt="Logo" className="h-10" />
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Contact Us</p>
            <p>Email: <a href="mailto:support@example.com" className="hover:text-yellow-400">support@example.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-yellow-400">+1 234 567 890</a></p>
            <p>Location: 1234 Assessment Lane, City, Country</p>
          </div>

          {/* Social Media */}
          <div className="mt-4 md:mt-0">
            <p className="text-lg font-semibold">Follow Us</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM6 0h12a4 4 0 014 4v16a4 4 0 01-4 4H6a4 4 0 01-4-4V4a4 4 0 014-4z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22.46 6c-.77.35-1.6.58-2.46.68a4.29 4.29 0 001.88-2.37 8.54 8.54 0 01-2.72 1.04A4.31 4.31 0 0015.74 5a4.3 4.3 0 00-4.3 4.3c0 .34.04.68.1 1a12.2 12.2 0 01-8.86-4.51c-.34.6-.53 1.3-.53 2.04 0 1.4.72 2.64 1.8 3.36a4.28 4.28 0 01-1.95-.53v.06c0 1.96 1.39 3.6 3.23 3.98a4.28 4.28 0 01-1.91.07c.53 1.66 2.08 2.88 3.9 2.91a8.64 8.64 0 01-5.36 1.85c-.35 0-.71-.02-1.06-.06a12.28 12.28 0 006.63 1.95c7.95 0 12.33-6.62 12.33-12.35 0-.19-.01-.38-.02-.56a8.76 8.76 0 002.17-2.23z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h4v4H4V4zm3 3H5V6h2v1zm6-3h4v4h-4V4zm3 3h-2V6h2v1zM4 10h4v10H4V10zm4-2H4v2h4V8zm8 2h4v10h-4V10zm4-2h-2v2h2V8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">&copy; 2024 Assessment Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
