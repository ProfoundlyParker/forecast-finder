import { FiSunrise, FiSunset } from "react-icons/fi";
import { SlSpeedometer } from "react-icons/sl";
import { BsWind } from "react-icons/bs";
import { IoWaterOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";

// weather detail props types
export interface WeatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

// Renders each weather component
export const WeatherDetails = (props: WeatherDetailProps) => {
    // default values
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6:20",
        sunset = "18:48",
    } = props;
    return (
        // Visibility
        <>
        <SingleWeatherDetail
        icon={<SlEye />}
        information="Visibility"
        value={visibility}
         />
         {/* Humidity */}
         <SingleWeatherDetail
        icon={<IoWaterOutline />}
        information="Humidity"
        value={humidity}
         />
         {/* Wind speed */}
         <SingleWeatherDetail
        icon={<BsWind />}
        information="Wind Speed"
        value={windSpeed}
         />
         {/* Air pressure */}
         <SingleWeatherDetail
        icon={<SlSpeedometer />}
        information="Air Pressure"
        value={airPressure}
         />
         {/* Sunrise */}
         <SingleWeatherDetail
        icon={<FiSunrise />}
        information="Sunrise"
        value={sunrise}
         />
         {/* Sunset */}
         <SingleWeatherDetail
         icon={<FiSunset />}
         information="Sunset"
         value={sunset}
          />
        </>
    )
};

// single weather detail props
export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

// Renders a single weather detail (info, icon, and value)
const SingleWeatherDetail = (props: SingleWeatherDetailProps) => {
    return (
        <div className="flex flex-col justify-around gap-2 items-center text-md font-medium text-black/80 p-2">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}