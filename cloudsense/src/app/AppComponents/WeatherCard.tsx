import React from "React";
import { motion } from "framer-motion";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  Droplets,
  Sun,
  Thermometer,
  Wind,
  CircleAlert, 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface incomingProps {
  city: string;
  temp: number;
  feelsLike: number;
  dt: number;
  minTemp: number;
  maxTemp: number;
  mainWeather: string;
  humidity: number;
  windSpeed: number;
}

const formatDate = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleString();
};

const WeatherCard = (props: incomingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="w-96 bg-white bg-opacity-80 backdrop-blur-md">
      <CardContent className=" p-6">
      
        {/* city name and tooltip */}
        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold text-gray-800">
            {props.city}
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger >
                <CircleAlert className="text-red-600 h-5 w-5"/>
              </TooltipTrigger>
              <TooltipContent className="bg-red-700 font-bold text-white">
                <p >Extreme weather condition. Stay Alert!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </div>

        {/* temperature div */}
        <div className="w-full my-1 flex justify-start text-4xl font-bold">
          {(props.temp - 273).toFixed(2)} °C{" "}
        </div>

        {/* feels like and time wala div */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-600">
            Feels like: {(props.feelsLike - 273).toFixed(2)}
          </p>
          <p className="text-sm font-semibold text-gray-600">
            {formatDate(props.dt)}
          </p>
        </div>

        {/* min and max temperatures */}
        <div className="flex justify-between items-center">

          <div className="text-xl font-bold text-gray-800">
            {(props.minTemp - 273).toFixed(2)} °C /{" "}
            {(props.maxTemp - 273).toFixed(2)} °C
          </div>

          <div>
            {props.mainWeather}
          </div>
          
        </div>

        {/* humidity and wind speed */}
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

);

export default WeatherCard;

