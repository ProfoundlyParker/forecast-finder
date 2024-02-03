// Converts meters to miles from API
export const meterstoMiles = (visibilityInMeters: number): string => {
    const visibilityInMiles = visibilityInMeters / 1609;
    return `${visibilityInMiles.toFixed(0)}mi`; // round to 0 decimal places and add 'mi' unit
}