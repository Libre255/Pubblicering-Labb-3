export interface ITodos {
  id:string;
  title:string;
  content:string;
  done:boolean;
}

const getTodosService = async ():Promise<ITodos[]>=>{
  const data = await fetch("https://localhost:44305/api/SuperHero");
  const dataJson = await data.json();
  return dataJson;
}

export default getTodosService;