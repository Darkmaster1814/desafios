/* Calculadora de inversiones */

let capitalFinal;
/* menu principal*/
function menu()
{
    let opcion=prompt("CALCULADORA DE INVERSIONES (Ingresa ESC para salir)\n1.Usar interés simple\n2.Usar interés compuesto");
    return opcion;
}
/* Constructor de valores */
function valores(tipoInteres)
{
    let capital,tipo,opcion,tasaInteres,tiempo,abono;
    capital=parseFloat(prompt("Introduce el capital inicial"));
    tipo=parseInt(prompt("Plazo:\n1.Semanal\n2.Mensual\n3.Anual"));
    switch(tipo)
    {
    case 1:
        alert("Calculando para un plazo en semanas");
        break;
    case 2:
        alert("Calculando para un plazo en meses");
        break;
    case 3:
        alert("Calculando para un plazo en años");
        break;
    default:
        alert("Opción invalida");
    }
    if(tipo==1)
    {
        tiempo=parseInt(prompt("Introduce la cantidad de semanas a invertir"));
        alert("Inversión a "+tiempo+" semanas");
    }
    else if(tipo==2)
    {
        tiempo=parseInt(prompt("Introduce la cantidad de meses a invertir"));
        alert("Inversión a "+tiempo+" meses");
    }
    else if(tipo==3)
    {
        tiempo=parseInt(prompt("Introduce la cantidad de años a invertir"));
        alert("Inversión a "+tiempo+" años");
    }

    opcion=parseInt(prompt("Deseas hacer abonos a capital\n 1.Si\n2.No"));
    switch(opcion)
    {
        case 1:
            alert("Calculando con abonos a capital");
            break;
        case 2:
            alert("Calculando sin abonos a capital");
            break;
        default:
            alert("Opción invalida");
    }    
    if(opcion==1&&tipo==1)
    {
        abono=parseFloat(prompt("Ingresa la cantidad a abonar semanalmente"));
        alert("Se abonará $"+abono+" semanalmente");
    }
    else if(opcion==1&&tipo==2)
    {
        abono=parseFloat(prompt("Ingresa la cantidad a abonar mensualmente"));
        alert("Se abonará $"+abono+" mensualmente");
    }
    else if(opcion==1&&tipo==3)
    {
        abono=parseFloat(prompt("Ingresa la cantidad a abonar anualmente"));
        alert("Se abonará $"+abono+" anualmente");
    }
    else
    {
        abono=0;
    }
    tasaInteres=parseFloat(prompt("Introduce la tasa de interés anual en % (0-100%)"));
    alert("Se calculará a partir de una taza anual de "+tasaInteres+"% anual");

    if(tipoInteres==1)
    {
    return calcularInversionInteresSimple(capital,abono,tiempo,tasaInteres,opcion);
    }
    else if(tipoInteres==2)
    {
        return calcularInversionInteresCompuesto(capital,abono,tiempo,tasaInteres,opcion)
    }
}

function calcularInversionInteresCompuesto(capital,abono,tiempo,tasaInteres,opcion)
{
    let capitalFinal=capital;
    if(opcion==1)
    {
        for(let time=1; time<=tiempo; time++)
        {
            capitalFinal=(capitalFinal+abono)+(capital)*(tasaInteres/100);
            capital=capitalFinal+abono;
        }
    }
    else
    {
        capitalFinal=(capital)*((1+(tasaInteres/100)/tiempo)**tiempo);
    }
    return Math.ceil(capitalFinal);
}

function calcularInversionInteresSimple(capital,abono,tiempo,tasaInteres,opcion)
{
    let capitalFinal=capital;
    if(opcion==1)
    {
        capitalFinal=capital+(capital+abono*tiempo)*(tasaInteres/100)*tiempo;
    }
    else
    {
        capitalFinal=capital+(capital)*(tasaInteres/100)*tiempo;
    }
    return Math.ceil(capitalFinal);
}


/* Programa */
let tipoInteres
let opcion=menu();
while(opcion.toLowerCase()!="esc")
{

    if(opcion!=""&&opcion.toLowerCase()!="esc")
    {
        opcion=parseFloat(opcion);
        if(!isNaN(opcion))
        {
            opcion=parseFloat(opcion);
            switch(opcion)
                {
                case 1:
                    tipoInteres=1;
                    alert("El capital final es:"+valores(tipoInteres));
                    break;
                case 2:
                    tipoInteres=2;
                    alert("Tu capital al final es:"+valores(tipoInteres));
                    break;
                default:
                alert("Opcion inválida");
                opcion=parseFloat(menu());
                }
        }
        else
        {
            alert("Ingresó una letra");
            opcion=menu();
        }
    }
}