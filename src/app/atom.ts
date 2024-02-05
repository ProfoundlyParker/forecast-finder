import { atom, useAtom } from "jotai";
// Atoms are similar to pieces of state in Redux store
// creates default state for place
export const placeAtom = atom("Atlanta");
// creates default state for loadingCity
export const loadingCityAtom = atom(false);
// creates default state for dark mode, and default is false, aka light mode
export const darkModeAtom = atom(false);
// custom hook to retrieve the current dark mode state
export const useDarkMode = () => useAtom(darkModeAtom);
// custom hook to toggle the dark mode state
export const useToggleDarkMode = () => {
    // destructures the setDarkMode function from the useDarkmMode hook
    const [, setDarkMode] = useDarkMode();
    // defines a function to toggle the dark mode state
    const toggleDarkMode = () => setDarkMode((prev) => !prev);
    // returns the toggleDarkMode function
    return toggleDarkMode;
}
