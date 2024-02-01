export const meterstoFeet = (visibilityInMeters: number): string => {
    const visibilityInFeet = visibilityInMeters * 3.281;
    return `${visibilityInFeet.toFixed(0)}ft`; // round to 0 decimal places and add 'ft' unit
}