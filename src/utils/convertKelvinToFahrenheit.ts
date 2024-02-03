// Converts Kelvin temps from API to Fahrenheit
export const convertKelvinToFahrenheit = (tempInKelvin: number): number => {
    const tempInFahrenheit = ((tempInKelvin - 273.15)*1.8) + 32;
    return Math.floor(tempInFahrenheit);
}