"use client";

import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Container } from "@/components/Container";
import { convertKelvinToFahrenheit } from "@/utils/convertKelvinToFahrenheit";
import { WeatherIcon } from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { WeatherDetails } from "@/components/WeatherDetails";
import { meterstoFeet } from "@/utils/metersToFeet";


interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => {
      // console.log("Weather API key: ", process.env.NEXT_PUBLIC_WEATHER_KEY)
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
}});

const firstData = data?.list[0];

useEffect(() => {
  console.log("data: ", data);
}, [data]);

  if (isPending) 
  return (
  <div className="flex items-center min-h-screen justify-center">
    <p className="animate-bounce">Loading...</p>
  </div>
  )
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
          <h2 className="flex gap-1 text-2xl items-end">
            <p> {format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')} </p>
            <p className="text-lg"> ({format(parseISO(firstData?.dt_txt ?? ''), 'MM.dd.yyyy')}) </p>
          </h2>
          <Container className="gap-10 px-6 items-center">
            {/* Temperature */}
            <div className="flex flex-col px-4">
              <span className="text-5xl">
              {convertKelvinToFahrenheit(firstData?.main.temp ?? 287.72)}°
              </span>
              <p className="text-xs space-x-1 whitespace-nowrap">
                <span>Feels like</span>
                <span>
                {convertKelvinToFahrenheit(firstData?.main.feels_like ?? 284.84)}°
                </span>
              </p>
              <p className="text-xs space-x-2">
                <span>
                {convertKelvinToFahrenheit(firstData?.main.temp_max ?? 287.72)}°↑{" "}
                </span>
                <span>
                {" "}
                {convertKelvinToFahrenheit(firstData?.main.temp_min ?? 286.46)}°↓
                </span>
              </p>
            </div>
            {/* Time & weather icon */}
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              {data?.list.map((d, i) => (
                <div key={i}
                className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                >
                  <p className="whitespace-nowrap">
                    {format(parseISO(d.dt_txt), 'h:mm a')}
                  </p>
                  <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}/>
                  <p>
                    {convertKelvinToFahrenheit(d?.main.temp ?? 287.72)}°
                  </p>
                </div>
              ))}
            </div>
          </Container>
          </div>
          <div className="flex gap-4">
              {/* left */}
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">{firstData?.weather[0].description}</p>
                  <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? "", firstData?.dt_txt ?? "")}/>
                </Container>
              {/* right */}
              <Container className="bg-blue-300/80 px-6 gap-4 justify-between overflow-x-auto">
                <WeatherDetails visibility={meterstoFeet(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`} />
              </Container>
          </div>
          </section>
        {/* 7 day forecast data */}
        <section className="flex w-full flex-col gap-4">
            <p className="text-2xl">
              7 Day Forecast
            </p>

        </section>

      </main>
    </div>
  );
}
