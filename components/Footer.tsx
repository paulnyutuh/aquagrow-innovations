
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WaterDropIcon, XIcon, FacebookIcon, LinkedInIcon } from './icons';
import { getCompanyInfo } from '../api/clientApi';
import { CompanyInfo } from '../types';

const Footer: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    getCompanyInfo().then(setCompanyInfo).catch(console.error);
  }, []);

  return (
    <footer className="bg-neutral-dark text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-extrabold text-white">
                <WaterDropIcon className="h-8 w-8 text-secondary-light" />
                <span>AquaGrow</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Transforming agriculture in Kenya, one drop at a time.
            </p>
            {companyInfo && (
              <div className="mt-6 flex space-x-4">
                <a href={companyInfo.socials.x} className="text-gray-400 hover:text-secondary-light"><span className="sr-only">X</span><XIcon className="h-6 w-6" /></a>
                <a href={companyInfo.socials.facebook} className="text-gray-400 hover:text-secondary-light"><span className="sr-only">Facebook</span><FacebookIcon className="h-6 w-6" /></a>
                <a href={companyInfo.socials.linkedin} className="text-gray-400 hover:text-secondary-light"><span className="sr-only">LinkedIn</span><LinkedInIcon className="h-6 w-6" /></a>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/farmers" className="text-base text-gray-300 hover:text-white">For Farmers</Link></li>
              <li><Link to="/impact" className="text-base text-gray-300 hover:text-white">Our Impact</Link></li>
              <li><Link to="/partners" className="text-base text-gray-300 hover:text-white">Investors</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact Us</h3>
            {companyInfo ? (
              <ul className="mt-4 space-y-2 text-base text-gray-300">
                {companyInfo.address.map((line, i) => <li key={i}>{line}</li>)}
                <li>{companyInfo.phone}</li>
                <li>{companyInfo.email}</li>
                <li><Link to="/admin" className="text-base text-gray-300 hover:text-white hover:underline">Admin Login</Link></li>
              </ul>
            ) : <div className="text-gray-300 text-sm">Loading...</div>}
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-base text-gray-400">
          <p>&copy; {new Date().getFullYear()} AquaGrow Innovations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;