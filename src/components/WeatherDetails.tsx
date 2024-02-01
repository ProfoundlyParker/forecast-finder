import { FiSunrise, FiSunset, FiWind } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { IoWaterOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";

export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export const WeatherDetails = (props: WeatherDetailProps) => {
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6:20",
        sunset = "18:48",
    } = props;
    return (
        <>
        <SingleWeatherDetail
        icon={<SlEye />}
        information="Visibility"
        value={visibility}
         />
         <SingleWeatherDetail
        icon={<IoWaterOutline />}
        information="Humidity"
        value={humidity}
         />
          <SingleWeatherDetail
        icon={<FiWind />}
        information="Wind Speed"
        value={windSpeed}
         />
         <SingleWeatherDetail
        icon={<ImMeter />}
        information="Air Pressure"
        value={airPressure}
         />
         <SingleWeatherDetail
        icon={<FiSunrise />}
        information="Sunrise"
        value={sunrise}
         />
         <SingleWeatherDetail
         icon={<FiSunset />}
         information="Sunset"
         value={sunset}
          />
        </>
    )
};

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

const SingleWeatherDetail = (props: SingleWeatherDetailProps) => {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}