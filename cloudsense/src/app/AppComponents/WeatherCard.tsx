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
    <Card className="
    w-[20rem]
    sm:w-[32rem]
    md:w-[21rem]
    lg:w-96 
    xl:w-96
    2xl:w-96
    
    bg-opacity-80 bg-white backdrop-blur-md">
      <CardContent className="p-3 sm:p-6 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
      
        {/* city name and tooltip */}
        <div className="
        flex justify-between items-center
        sm:flex sm:justify-between sm:items-center
        md:flex md:justify-between md:items-center
        lg:flex lg:justify-between lg:items-center
        xl:flex xl:justify-between xl:items-center
        2xl:flex 2xl:justify-between 2xl:items-center">

          <h2 className="
          text-2xl font-bold 
          sm:text-2xl sm:font-bold 
          md:text-2xl md:font-bold 
          lg:text-2xl lg:font-bold 
          xl:text-2xl xl:font-bold 
          2xl:text-2xl 2xl:font-bold 
          
          text-gray-800">
            {props.city}
          </h2>

          {
            // @ts-ignore
            (props.temp - 273).toFixed(2) >= 28 ?
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger >
                  <CircleAlert className="
                  h-5 w-5
                  sm:h-5 sm:w-5
                  md:h-5 md:w-5
                  lg:h-5 lg:w-5
                  xl:h-5 xl:w-5
                  2xl:h-5 2xl:w-5 
                  
                  text-red-600 "/>
                </TooltipTrigger>
                <TooltipContent className="bg-red-700 font-bold text-white">
                  <p >Extreme weather condition. Stay Alert!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> 
            : 
            <></>
          }

        </div>

        {/* temperature div */}
        <div className="
        w-full my-1 flex justify-start text-4xl font-bold
        sm:w-full sm:my-1 sm:flex sm:justify-start sm:text-4xl sm:font-bold
        md:w-full md:my-1 md:flex md:justify-start md:text-4xl md:font-bold
        lg:w-full lg:my-1 lg:flex lg:justify-start lg:text-4xl lg:font-bold
        xl:w-full xl:my-1 xl:flex xl:justify-start xl:text-4xl xl:font-bold
        2xl:w-full 2xl:my-1 2xl:flex 2xl:justify-start 2xl:text-4xl 2xl:font-bold">
          {(props.temp - 273).toFixed(2)} °C{" "}
        </div>

        {/* feels like and time wala div */}
        <div className="
        flex justify-between items-center
        sm:flex sm:justify-between sm:items-center
        md:flex md:justify-between md:items-center
        lg:flex lg:justify-between lg:items-center
        xl:flex xl:justify-between xl:items-center
        2xl:flex 2xl:justify-between 2xl:items-center">
          <p className="
          text-sm font-semibold text-gray-600
          sm:text-sm sm:font-semibold sm:text-gray-600
          md:text-sm md:font-semibold md:text-gray-600
          lg:text-sm lg:font-semibold lg:text-gray-600
          xl:text-sm xl:font-semibold xl:text-gray-600
          2xl:text-sm 2xl:font-semibold 2xl:text-gray-600">
            Feels like: {(props.feelsLike - 273).toFixed(2)}
          </p>
          <p className="
          text-sm font-semibold text-gray-600
          sm:text-sm sm:font-semibold sm:text-gray-600
          md:text-sm md:font-semibold md:text-gray-600
          lg:text-sm lg:font-semibold lg:text-gray-600
          xl:text-sm xl:font-semibold xl:text-gray-600
          2xl:text-sm 2xl:font-semibold 2xl:text-gray-600">
            {formatDate(props.dt)}
          </p>
        </div>

        {/* min and max temperatures */}
        <div className="
        flex my-2 justify-between items-center
        sm:flex sm:my-2 sm:justify-between sm:items-center
        md:flex md:my-2 md:justify-between md:items-center
        lg:flex lg:my-2 lg:justify-between lg:items-center
        xl:flex xl:my-2 xl:justify-between xl:items-center
        2xl:flex 2xl:my-2 2xl:justify-between 2xl:items-center">

          <div className="
          text-sm font-semibold text-gray-800
          sm:text-sm sm:font-semibold sm:text-gray-800
          md:text-sm md:font-semibold md:text-gray-800
          lg:text-sm lg:font-semibold lg:text-gray-800
          xl:text-sm xl:font-semibold xl:text-gray-800
          2xl:text-sm 2xl:font-semibold 2xl:text-gray-800">
            Min: {(props.minTemp - 273).toFixed(2)} °C /
            Max: {(props.maxTemp - 273).toFixed(2)} °C
          </div>

          <div className="
          text-sm font-semibold text-gray-800
          sm:text-sm sm:font-semibold sm:text-gray-800
          md:text-sm md:font-semibold md:text-gray-800
          lg:text-sm lg:font-semibold lg:text-gray-800
          xl:text-sm xl:font-semibold xl:text-gray-800
          2xl:text-sm 2xl:font-semibold 2xl:text-gray-800">
            {props.mainWeather}
          </div>
          
        </div>

        {/* humidity and wind speed */}
        <div className="
        flex mt-3 justify-between text-sm text-gray-600
        sm:flex sm:mt-3 sm:justify-between sm:text-sm sm:text-gray-600
        md:flex md:mt-3 md:justify-between md:text-sm md:text-gray-600
        lg:flex lg:mt-3 lg:justify-between lg:text-sm lg:text-gray-600
        xl:flex xl:mt-3 xl:justify-between xl:text-sm xl:text-gray-600
        2xl:flex 2xl:mt-3 2xl:justify-between 2xl:text-sm 2xl:text-gray-600">
          <div>
            <Droplets className="
            inline mr-1
            sm:inline sm:mr-1
            md:inline md:mr-1
            lg:inline lg:mr-1
            xl:inline xl:mr-1
            2xl:inline 2xl:mr-1" 
            size={16} />
            Humidity: {props.humidity}
          </div>
          <div>
            <Wind className="
            inline mr-1
            sm:inline sm:mr-1
            md:inline md:mr-1
            lg:inline lg:mr-1
            xl:inline xl:mr-1
            2xl:inline 2xl:mr-1" 
            size={16} />
            Wind: {props.windSpeed} km/h
          </div>
        </div>
        
      </CardContent>
    </Card>
  </motion.div>

);

export default WeatherCard;

