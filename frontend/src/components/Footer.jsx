import React from 'react';
import facebookIcon from '../assets/facebook.png';
import xIcon from '../assets/x.png';
import linkedinIcon from '../assets/download (6).png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">JobHub</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Your one-stop platform to connect talent with opportunity. Built with the MERN stack.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Email: support@jobhunt.com
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-200 cursor-pointer group">
                <img 
                  src={facebookIcon} 
                  alt="Facebook" 
                  className="w-6 h-6 group-hover:scale-110 transition-transform" 
                />
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-200 cursor-pointer group">
                <img 
                  src={xIcon} 
                  alt="X" 
                  className="w-6 h-6 group-hover:scale-110 transition-transform" 
                />
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-200 cursor-pointer group">
                <img 
                  src={linkedinIcon} 
                  alt="LinkedIn" 
                  className="w-6 h-6 group-hover:scale-110 transition-transform" 
                />
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 JobHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
