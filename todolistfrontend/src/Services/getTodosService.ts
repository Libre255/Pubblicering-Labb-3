import { ITodos } from "../Data/ITodos";

const getTodosService = async ():Promise<ITodos[]>=>{
  const data = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/SuperHero`);
  const dataJson = await data.json();
  return dataJson;
}

export default getTodosService;