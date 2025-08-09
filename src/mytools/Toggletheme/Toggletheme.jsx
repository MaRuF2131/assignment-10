// DarkModeToggle.jsx
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import localforage from "localforage";
import { useAuthContext } from '../context/context';

const DarkModeToggle = () => {
  const{theme, setTheme}=useAuthContext();

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await localforage.getItem('theme');
      const finalTheme = savedTheme || 'light';
      setTheme(finalTheme);
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await localforage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center p-1  rounded-full shadow-md border border-gray-300 dark:border-gray-600  dark:bg-red-800 bg-white text-gray-900 dark:text-gray-100 hover:scale-105 transition-all"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
};

export default DarkModeToggle;
