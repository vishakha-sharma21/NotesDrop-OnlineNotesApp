import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List } from 'lucide-react';

/*const Navbar = () => {
  return (
    <div className='max-w-full'>
      <div className='mb-6'>
        <h1 className='font-mono font-bold '>NOTESDROP</h1>
        <p>Create and Manage Your Notes at one Place !! </p>
      </div>
    <div className="w-full flex gap-6 justify-center py-3 bg-gray-100 shadow">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-600' : 'text-gray-600'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? 'font-bold text-blue-600' : 'text-gray-600'
        }
      >
        Pastes
      </NavLink>
    </div>

    </div>
    
  );
};
*/

const Navbar = () => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className='font-mono text-3xl font-bold text-purple-400'>NOTESDROP</h1>
            <p className="text-sm text-gray-400">Create and Manage Your Notes at one Place !!</p>
          </div>
          <nav className="flex space-x-3 sm:space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out flex items-center space-x-2 text-sm sm:text-base
                ${isActive ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 hover:bg-purple-500 hover:text-white'}`
              }
            >
              <Home size={18} /> <span>Home</span>
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out flex items-center space-x-2 text-sm sm:text-base
                ${isActive ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 hover:bg-purple-500 hover:text-white'}`
              }
            >
              <List size={18} /> <span>Notes</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
