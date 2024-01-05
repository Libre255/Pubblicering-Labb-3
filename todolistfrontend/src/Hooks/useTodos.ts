import { ITodos } from "../Data/ITodos";
import getTodosService from "../Services/getTodosService"
import { useEffect, useState } from "react";

const useTodos = () => {
 const [todosList, setTodosList] = useState<ITodos[]>([])
 const [toggleForUpdate, settoggleForUpdate] = useState<boolean>(false)
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
   console.log("Fetching!")
 }, [toggleForUpdate])

 return { todosList, setTodosList, error, settoggleForUpdate}
}

export default useTodos;