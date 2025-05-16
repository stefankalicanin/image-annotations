import React from 'react';

import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <nav className="flex flex-col w-full justify-center bg-black items-center border-[#27272a] border-b-2 p-2">
      <div className="flex justify-center items-center text-white w-full ">
        <div className="hidden md:flex md:justify-center md:items-center md:w-full md:space-x-5 md:text-base md:font-semibold">
          <Link to="/" className="p-2">
            Home
          </Link>
          <Link to="/upload" className="p-2">
            Upload
          </Link>
          <Link to="/all" className="p-2">
            Show all
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden text-base font-semibold"
        >
          Menu
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col space-y-2 w-full bg-black text-white text-base font-semibold">
          <Link to="/" onClick={() => setIsOpen(false)} className="p-2">
            Home
          </Link>
          <Link to="/upload" onClick={() => setIsOpen(false)} className="p-2">
            Upload
          </Link>
          <Link to="/all" onClick={() => setIsOpen(false)} className="p-2">
            Show all
          </Link>
        </div>
      )}
    </nav>
  );
};
