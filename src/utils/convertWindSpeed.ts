// Converts windspeed from API from meters per second to miles per hour
export const convertWindSpeed = (speedInMetersPerSecond: number): string => {
    const speedInMilesPerHour = speedInMetersPerSecond * 2.237; //converts m/s to mph
    return `${speedInMilesPerHour.toFixed(0)}mph`
}