import { useState, useEffect } from 'react'

export const useDebounce = (value: string, millis: number) => {
 const [delayedValue, setDelayedValue] = useState(value);

 useEffect(() => {
   const handler = setTimeout(() => {
    setDelayedValue(value);
   }, millis);

   return () => {
     clearTimeout(handler);
   };
 }, [value, millis]);

 return delayedValue;
};