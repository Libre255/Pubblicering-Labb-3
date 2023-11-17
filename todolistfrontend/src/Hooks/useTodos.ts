import getTodosService, { ITodos } from "../Services/getTodosService"
import { useEffect, useState } from "react";

const useTodos = () => {
 const [todosList, setTodosList] = useState<ITodos[]>([])
 const [error, setError] = useState<Error>();

 useEffect(() => {
   const fetching = async ()=>{
    try{
      const datafetch = await getTodosService();
      if(!datafetch) throw new Error("couldnt fetch from getTodosServices at useTodos");
      setTodosList(datafetch);

    }catch(e:any){
      setError(e.message)
    }
   }
   fetching();
 }, [])

 return { todosList, setTodosList, error}
}

export default useTodos;