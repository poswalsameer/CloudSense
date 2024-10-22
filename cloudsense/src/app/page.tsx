"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudDrizzle, CloudRain, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { motion } from "framer-motion"
import WeatherCard from './AppComponents/WeatherCard';

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface WeatherListItem {
  dt: number;
  main: Main;
  weather: Weather[];
  wind: Wind;
  dt_txt: string;
}

interface City {
  id: number;
  name: string;
  country: string;
}

interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[]; 
  city: City;
}

// Mock weather data for 6 cities
const weatherData = [
  {
    city: "New York",
    temperature: 22,
    minTemp: 18,
    maxTemp: 26,
    condition: "Partly Cloudy",
    humidity: 60,
    windSpeed: 12,
  },
  {
    city: "London",
    temperature: 18,
    minTemp: 15,
    maxTemp: 21,
    condition: "Rainy",
    humidity: 75,
    windSpeed: 15,
  },
  {
    city: "Tokyo",
    temperature: 28,
    minTemp: 24,
    maxTemp: 32,
    condition: "Sunny",
    humidity: 55,
    windSpeed: 8,
  },
  {
    city: "Sydney",
    temperature: 25,
    minTemp: 20,
    maxTemp: 29,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 14,
  },
  {
    city: "Dubai",
    temperature: 36,
    minTemp: 30,
    maxTemp: 41,
    condition: "Sunny",
    humidity: 40,
    windSpeed: 10,
  },
  {
    city: "Moscow",
    temperature: 12,
    minTemp: 8,
    maxTemp: 16,
    condition: "Cloudy",
    humidity: 70,
    windSpeed: 18,
  },
]

// const WeatherIcon = ({ condition }) => {
//   switch (condition.toLowerCase()) {
//     case "sunny":
//       return <Sun className="w-12 h-12 text-yellow-400" />
//     case "rainy":
//       return <CloudRain className="w-12 h-12 text-blue-400" />
//     case "partly cloudy":
//       return <Cloud className="w-12 h-12 text-gray-400" />
//     case "cloudy":
//       return <CloudDrizzle className="w-12 h-12 text-gray-500" />
//     default:
//       return <Cloud className="w-12 h-12 text-gray-400" />
//   }
// }

// { city, temperature, minTemp, maxTemp, condition, humidity, windSpeed }


export default function WeatherApp() {

  const [time, setTime] = useState<Date>(new Date())
  const [cityData, setCityData] = useState<ForecastResponse[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchData = async ( city: string ): Promise<ForecastResponse> => {
    const apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    const response = await fetch(apiURL);
    const data: ForecastResponse = await response.json();
    return data;
  }

  useEffect(() => {
    const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];

    const fetchAllCitiesData = async () => {
      const allCitiesData: ForecastResponse[] = await Promise.all(
        cities.map(city => fetchData(city))
      );
      setCityData(allCitiesData);
      console.log(allCitiesData); // allCitiesData[0].list will give the 40 sized array
    };

    // Fetch data on component mount
    fetchAllCitiesData();

    // Set up an interval to fetch data every 5 minutes (300,000 ms)
    const intervalId = setInterval(() => {
      fetchAllCitiesData();
    }, 300000); // 300000 ms = 5 minutes

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // useEffect( () => {
  //   const cities = ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata", "Hyderabad"];
  //   const fetchAllCitiesData = async () => {
  //     const allCitiesData: ForecastResponse[] = await Promise.all(
  //       cities.map(city => fetchData(city)) 
  //     );

  //     setCityData(allCitiesData);
  //     console.log(allCitiesData); //allCitiesData[0].list will give the 40 sized array
  //   };

  //   fetchAllCitiesData();

  // }, [])

  const hours = time.getHours()
  const isDaytime = hours > 6 && hours < 20

  return (
    <div className={`min-h-screen p-8 ${
      isDaytime 
        ? "bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100" 
        : "bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800"
    }`}>

      <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
        Weather Updates
      </h1>

      <div className="grid grid-cols-3 justify-items-center place-content-center gap-y-10">

        {cityData.map((city, index) => (
          <div key={index} >
            <WeatherCard  
              city={city.city.name}
              temp={city.list[0].main.temp}
              feelsLike={city.list[0].main.feels_like}
              dt={city.list[0].dt}
              minTemp={city.list[0].main.temp_min}
              maxTemp={city.list[0].main.temp_max}
              mainWeather={city.list[0].weather[0].main}
              humidity={city.list[0].main.humidity}
              windSpeed={city.list[0].wind.speed}
            />
          </div>
        ))}
        
      </div>
    </div>
  )
}