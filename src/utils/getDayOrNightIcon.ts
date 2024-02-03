// Calculates the time and whether a day or night icon needs to be displayed
export const getDayOrNightIcon = (
    iconName: string,
    dateTimeString: string
): string => {
    const hours = new Date(dateTimeString).getHours(); // get hours from the given date and time
    const isDayTime = hours >= 6 && hours < 18; // considers daytime from 6 AM to 6 PM
    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n"); //replaces last character of icon name with either d or n based on time (day vs night)
}