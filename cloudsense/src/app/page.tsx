"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudDrizzle, CloudRain, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { motion } from "framer-motion"

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

const WeatherCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="w-full max-w-sm bg-white bg-opacity-80 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Delhi</h2>
            <p className="text-4xl font-bold text-gray-900">40°C</p>
          </div>
          {/* <WeatherIcon condition={condition} /> */}
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <div>
            <Thermometer className="inline mr-1" size={16} />
            20°C / 45°C
          </div>
          <div>Sunny</div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <Droplets className="inline mr-1" size={16} />
            Humidity: 40%
          </div>
          <div>
            <Wind className="inline mr-1" size={16} />
            Wind: 13 km/h
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function WeatherApp() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {weatherData.map((city, index) => (
          <div key={index} className={`transform ${index % 2 === 0 ? "md:translate-y-4" : ""}`}>
            <WeatherCard />
          </div>
        ))}
      </div>
    </div>
  )
}