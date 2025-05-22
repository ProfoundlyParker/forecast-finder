export function utcToLocalTime(utcSeconds: number, timezoneOffsetSeconds: number): Date {
  return new Date((utcSeconds + timezoneOffsetSeconds) * 1000);
}