import { atom } from "jotai";
// Atoms are similar to pieces of state in Redux store
// creates default state for place
export const placeAtom = atom("Atlanta");
// creates default state for loadingCity
export const loadingCityAtom = atom(false);