export interface ITodos {
  id:string;
  title:string;
  content:string;
  done:boolean;
}

const getTodosService = async ():Promise<ITodos[]>=>{
  const data = await fetch("https://containerpublabb2back.happycoast-54236b18.westeurope.azurecontainerapps.io/apitodo");
  const dataJson = await data.json();
  return dataJson;
}

export default getTodosService;