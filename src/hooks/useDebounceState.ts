import { useEffect, useRef, useState } from "react";
import { searchTask } from "../Todo/TodoApi";
import { Task } from "../Todo/Todo";


export default function useDebounceState(initialState: string, times = 500): [Task[], (inputState: string) => void] {
    const timeoutRef = useRef<number>(0);
    const [debounce, setDebounceState] = useState<Task[]>([])
    
    useEffect(() => {
        setDebounce(initialState)
    },[])

    function setDebounce(inputState: string) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(async () => {
            const search = await searchTask(inputState);
            setDebounceState(search)
        }, times)

    }    

    return [debounce, setDebounce]
}