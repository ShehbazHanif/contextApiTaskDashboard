import { debounce } from "@mui/material";
import { useEffect, useState } from "react";
// export const useDebounce = (value, delay) => {
//     const [debouncedValue, setDebouncedValue] = useState("");
//     const handler = () => {
//         console.log("handler called, scheduling for value:", value);
//         // console.log("delay time before setTimeout:", delay);
//         const timerId = setTimeout(() => {
//             // console.log("delay time  firing with:", delay);
//             setDebouncedValue(value);
//             // return () => clearTimeout(handler)
//         }, delay);
//         console.log("timerId", timerId);
//         clearTimeout(timerId);
//         return debouncedValue;
//     };
//     return handler();

// };



export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState("");
    useEffect(() => {
        const timerId = setTimeout(() => {
            // console.log("Timeout fired:", timerId);
            setDebounceValue(value)

        }, delay)
        // console.log("Assigned timeout ID:", timerId);

        return () => {
            // console.log("Clearing timeout ID:", timerId);
            clearTimeout(timerId)
        }
    }, [value, delay])
    return debounceValue;
}
