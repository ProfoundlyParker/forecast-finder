"use client";

import { Navbar } from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, fromUnixTime, parseISO } from "date-fns";
import { Container } from "@/components/Container";
import { convertKelvinToFahrenheit } from "@/utils/convertKelvinToFahrenheit";
import { WeatherIcon } from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { WeatherDetails } from "@/components/WeatherDetails";
import { meterstoMiles } from "@/utils/metersToMiles";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { ForecastWeatherDetail } from "@/components/ForecastWeatherDetail";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";

// Defines the structure of the weatherdetails
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
// Defines the structure of weather data from API
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

// Fetches weather data from API, processes + displays it, handles loading states with React hooks and Jotai atoms + renders skeleton UI while data loads
const Home = () => {
  // Uses atoms from Jotai for managing global state for current place, and loading state of city data
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, ] = useAtom(loadingCityAtom);
  // Uses useQuery hook from tanstack to fetch weather data from API
  const { isPending, error, data, refetch } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
}});
// Extracts the first data entry from the weather data list/array
const firstData = data?.list[0];

// Runs refetch to fetch updated weather data whenever the place atom or refetch function changes
useEffect(() => {
  refetch();
}, [place, refetch]);

// Extracts unique dates from the weather data list
const uniqueDates = [
  ...new Set(
    data?.list.map(
      (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
    )
  )
];

// filters data to get the first entry after 6 AM for each unique date
const firstDataForEachDate = uniqueDates.map((date) => {
  return data?.list.find((entry) => {
    const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
    const entryTime = new Date(entry.dt * 1000).getHours();
    return entryDate === date && entryTime >= 6;
  })
})

  if (isPending) 
  return (
    // Renders loading indicator if data is still pending
  <div className="flex items-center min-h-screen justify-center">
    <p className="animate-bounce">Loading...</p>
  </div>
  )
  // Renders main content including navbar, today's weather data and 5 day forecast
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {loadingCity ? (
          <WeatherSkeleton />
        ) : (
        // Renders today data
        <>
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
                  {format(parseISO(d?.dt_txt ?? ''), 'EEEE')}
                  </p>
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
                <WeatherDetails visibility={meterstoMiles(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(fromUnixTime(data?.city.sunrise ?? 1706790868), "h:mm a")} 
                sunset={format(fromUnixTime(data?.city.sunset ?? 1706828854), "h:mm a")} 
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 2.15)}
                />
              </Container>
          </div>
          </section>
        {/* 5 day forecast data */}
        <section className="flex w-full flex-col gap-4 whitespace-nowrap">
            <p className="text-2xl">
              5 Day Forecast
            </p>
            {firstDataForEachDate.map((d, i) => (
              <ForecastWeatherDetail 
              key={i}
              description={d?.weather[0].description ?? ""}
              weatherIcon={d?.weather[0].icon ?? "o1d"}
              date={format(parseISO(d?.dt_txt ?? ""), "MM.dd")}
              day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
              feels_like={d?.main.feels_like ?? 0}
              temp={d?.main.temp ?? 0}
              temp_max={d?.main.temp_max ?? 0}
              temp_min={d?.main.temp_min ?? 0}
              airPressure={`${d?.main.pressure} hPa`}
              humidity={`${d?.main.humidity}%`}
              sunrise={format(fromUnixTime(data?.city.sunrise ?? 1706790868), "h:mm a")}
              sunset={format(fromUnixTime(data?.city.sunset ?? 1706828854), "h:mm a")}
              visibility={`${meterstoMiles(d?.visibility ?? 10000)}`}
              windSpeed={`${convertWindSpeed(d?.wind.speed ?? 2.75)}`}
              />
            ))}
        </section>
        </>
        )}
      </main>
    </div>
  );
}

// Renders skeleton UI for weather data when loading
const WeatherSkeleton = () => {
  return (
    <section className="space-y-8 ">
      {/* Today's data skeleton */}
      <div className="space-y-2 animate-pulse">
        {/* Date skeleton */}
        <div className="flex gap-1 text-2xl items-end ">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>

        {/* Time wise temperature skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 days forecast skeleton */}
      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-8 w-36 bg-gray-300 rounded"></p>

        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;