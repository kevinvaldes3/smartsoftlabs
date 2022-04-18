const XLSX = require("xlsx");
function leerExcel(ruta) {
  const workbook = XLSX.readFile(ruta);
  const workbookSheets = workbook.SheetNames;
  const sheet = workbookSheets[0];
  const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  let provincia="";
  let poblacion=0;
  let muertos=0;
  let porcentaje=0.0;
  let resultado= [];
  let resultPorcent = []; 
  let prim =1; 
  for (let index = 0; index < dataExcel.length; index++) {
    const element = dataExcel[473];
    if(provincia!=dataExcel[index]['Province_State']){
      porcentaje=(muertos/poblacion)*100;
      let val = {provincia,poblacion,muertos,porcentaje}
      let porc = porcentaje.toFixed(2)
      let valProcet = {provincia,porcentaje:porc}
      if (prim == 1) {
        prim=0;
      }else{
        resultado.push(val); 
        resultPorcent.push(valProcet); 
      }
      provincia=dataExcel[index]['Province_State'];
      poblacion=dataExcel[index]['Population'];
      muertos=dataExcel[index]['4/26/21'];
    }
    else
    {
      poblacion+=dataExcel[index]['Population'];
      muertos+=dataExcel[index]['4/26/21'];
    }
  }
  console.log("provincia con mayor numero de muertos : ",hallarMax(resultado));
  console.log("provincia con menor numero de muertos : ",hallarMin(resultado));
  console.log(resultPorcent);
  console.log("estado más afectado: ",hallarMax2(resultPorcent), " pues fue el estado con mayor porcentaje de muertes vs la población ");
  console.log("el estado mas afectado es: ", hallarMax2(resultPorcent), " ya que al sacar el porcentaje de las muertes vs. la población se determinó que el número de muertes es más alta por su elevada tasa de mortalidad");
  console.log("en el estado mayor acumulado por fecha es: ", hallarMax(resultado), " ya que este estado está mostrando la fecha con mayor acomulacion por muertes.");
  console.log("en el estado menor acumulado por fecha es: ", hallarMin(resultado), " ya que este estado está mostrando la fecha con menor acomulacion por muertes.");
  console.log(" en el estado: ", hallarMax2(resultPorcent), " es el más afectado por estado ya que ese estado se le saca el porcentaje por muerte acumuladas vs cantidad de habitantes acumulados.");
   
    
}

  function hallarMax(datos){
    let max=0;
    let provincia="";
    for (let index = 0; index < datos.length; index++) {
      const element = datos[index];      
      if(datos[index]['muertos']>=max){
        max=datos[index]['muertos'];
        provincia=datos[index]['provincia'];    
      }
    } 
    
    return provincia;
  }

  function hallarMin(datos){
    let min=999999999999;
    let provincia="";
    for (let index = 0; index < datos.length; index++) {
      const element = datos[index];      
      if(datos[index]['muertos']<=min){
        min=datos[index]['muertos'];
        provincia=datos[index]['provincia'];    
      }
    } 
    
    return provincia;
  }

  function hallarMax2(datos){
    let max=0;
    let provincia="";
    for (let index = 0; index < datos.length; index++) {
      const element = datos[index];      
      if(datos[index]['porcentaje']>=max && datos[index]['porcentaje']!='NaN' && datos[index]['porcentaje']!='Infinity'){
        max=datos[index]['porcentaje'];
        provincia=datos[index]['provincia'];    
      }
    } 
    
    return provincia;
  }

leerExcel("time_series_covid19_deaths_US.csv");
