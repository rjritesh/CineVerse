import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#031243] to-[#000000] text-white py-12 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-bold mb-4">CineVerse</h1>
          <p className="text-gray-300">
            CineVerse brings you AI-powered personalized movie recommendations, latest releases, and your favorite classics – all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#features" className="hover:text-white transition">Features</a></li>
            <li><a href="#browse" className="hover:text-white transition">Browse</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-100 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-100 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-100 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-100 transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-gray-500 text-sm tracking-wide">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-white font-semibold">CineVerse</span> - Curated with 🍿 & ❤️ by <span className="text-white">Ritesh Jha</span>
        </p>
        <p className="mt-1 italic">Because great movies deserve great recommendations.</p>
      </div>

    </footer>
  );
};

export default Footer;
