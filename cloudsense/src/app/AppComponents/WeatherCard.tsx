import React from 'React';
import { motion } from "framer-motion"
import { Cloud, CloudDrizzle, CloudRain, Droplets, Sun, Thermometer, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface incomingProps{
    city: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    mainWeather: string;
    humidity: number;
    windSpeed: number;
}

const WeatherCard = (props: incomingProps) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-sm bg-white bg-opacity-80 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{props.city}</h2>
              <p className="text-4xl font-bold text-gray-900">{(props.temp - 273).toFixed(2)} °C </p>
            </div>
            {/* <WeatherIcon condition={condition} /> */}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <div>
              <Thermometer className="inline mr-1" size={16} />
              {(props.minTemp - 273).toFixed(2)} °C / {(props.maxTemp - 273).toFixed(2)} °C
            </div>
            <div>{props.mainWeather}</div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <div>
              <Droplets className="inline mr-1" size={16} />
              Humidity: {props.humidity}
            </div>
            <div>
              <Wind className="inline mr-1" size={16} />
              Wind: {props.windSpeed} km/h
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

export default WeatherCard