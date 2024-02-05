import { Container } from "@/components/Container";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherDetailProps, WeatherDetails } from "./WeatherDetails";
import { convertKelvinToFahrenheit } from "@/utils/convertKelvinToFahrenheit";

// interface that extends weatherdetailprops
export interface ForecastWeatherDetailProps extends WeatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}
// Displays weather components
export const ForecastWeatherDetail = (props: ForecastWeatherDetailProps) => {
    // default prop values
    const {
        weatherIcon = "02d",
        date = "09.19",
        day = "Thursday",
        temp,
        feels_like,
        temp_min,
        temp_max,
        description,
    } = props;
    return (
        <Container className="gap-4">
            {/* left section - displays weather icon, date, and day */}
            <section className="flex gap-4 items-center px-4">
                <div className="flex flex-col gap-1 items-center">
                    <WeatherIcon iconName={weatherIcon} />
                    <p>{date}</p>
                    <p className="text-sm">{day}</p>
                </div>
                {/* Displays current temp and feels like temp, and current weather description */}
                <div className="flex flex-col px-2">
                    <span className="text-5xl">{convertKelvinToFahrenheit(temp ?? 0)}°</span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                        <span>Feels like</span>
                        <span>{convertKelvinToFahrenheit(feels_like ?? 0)}°</span>
                    </p>
                    <p className="capitalize">{description}</p>
                </div>
            </section>
            {/* right section - renders weather details with x scroll bar */}
            <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
                <WeatherDetails {...props} />
            </section>
        </Container>
    )
}