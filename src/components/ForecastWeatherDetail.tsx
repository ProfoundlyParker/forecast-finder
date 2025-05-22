import { Container } from "@/components/Container";
import { WeatherIcon } from "./WeatherIcon";
import { WeatherDetailProps, WeatherDetails } from "./WeatherDetails";
import { convertKelvinToFahrenheit } from "@/utils/convertKelvinToFahrenheit";
import { useDarkMode } from "@/app/atom";

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
    const [darkMode] = useDarkMode();
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
        <Container className="flex gap-4 transition-transform duration-700 hover:scale-105 hover:shadow-xl">
            {/* left section - displays weather icon, date, and day */}
            <section className="flex gap-4 items-center px-4 sm:w-[222px] w-[180px] shrink-0">
                <div className="flex flex-col gap-1 items-center">
                    <WeatherIcon iconName={weatherIcon} />
                    <p>{date}</p>
                    <p className="text-md">{day}</p>
                </div>
                {/* Displays current temp and feels like temp, and current weather description */}
                <div className="flex flex-col px-2">
                    <span className="sm:text-5xl text-4xl text-end">{convertKelvinToFahrenheit(temp ?? 0)}°</span>
                    <p className="text-sm space-x-1 whitespace-normal sm:text-md text-center">
                        <span>Feels like</span>
                        <span>{convertKelvinToFahrenheit(feels_like ?? 0)}°</span>
                    </p>
                    <p className="capitalize whitespace-normal text-center">{description}</p>
                </div>
            </section>
            {/* right section - renders weather details with x scroll bar */}
            <section className={`${darkMode ? 'bg-neutral-100/60' : 'bg-sky-500/10'} overflow-x-auto flex justify-around gap-4 sm:px-4 w-fit sm:min-w-[calc(100%-260px)] min-w-[calc(100% - 200px)] pr-4 px-2 sm:pr-10 scrollbar-hover rounded-2xl`}>
                <WeatherDetails {...props} />
            </section>
        </Container>
    )
}