export const convertWindSpeed = (speedInMetersPerSecond: number): string => {
    const speedInMilesPerHour = speedInMetersPerSecond * 2.237; //converts m/s to mph
    return `${speedInMilesPerHour.toFixed(0)}mph`
}