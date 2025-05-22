import { useDarkMode } from "@/app/atom";

// function that controls light mode vs dark mode
export const ThemeSwitch = () => {
    const [darkMode, setDarkMode] = useDarkMode();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    // Returns light/dark mode toggle button
    <button
      className={`relative inline-block w-12 h-6 rounded-full bg-gray-300 focus:outline-none ${darkMode ? 'bg-gray-600' : 'bg-sky-500'}`}
      onClick={toggleDarkMode}
    >
      <span
        className={`absolute left-2 top-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'transform translate-x-full' : ''}`}
      />
    </button>
  );
};
