/* Variables globales */
let productos=[];
let id=1;
/* variables de nodos  */
let formulario;
let inputNombre;
let inputCantidad;
let inputPrecio;
let inputCategoria;
let contenedorProductos;
let estadisticas;

/* Clase constructora para produtos */
class Producto{
    constructor(id, nombre, cantidad, precio, categoria)
    {
        this.id=id;
        this.nombre=nombre.toUpperCase();
        this.cantidad=cantidad;
        this.precio=precio;
        this.categoria=categoria.toUpperCase();
    }
        /* Methodos de producto */
        calcularCosto=()=>this.cantidad*this.precio;
        calcularTotalDeProductos=()=>this.cantidad;
}
/* inicializar los nodos dentro del HTML */
function inicializarElementos()
{
    formulario=document.getElementById("formulario");
    inputNombre=document.getElementById("inputNombre");
    inputCantidad=document.getElementById("inputCantidad");
    inputPrecio=document.getElementById("inputPrecio");
    inputCategoria=document.getElementById("inputCategoria");
    contenedorProductos=document.getElementById("contenedorProductos");
    estadisticas=document.getElementById("estadisticas");
}

/* Inizializar los eventos en este caso el evento es un click en el boton registrar producto */
function InicializarEventos()
{
    formulario.onsubmit=(evento)=> validarFormulario(evento);
}
/* obtener los valores de los nodos dados en el HTML */
function validarFormulario(evento){
    evento.preventDefault();//Elimina el reinicio por default que da el boton
    let nombre=inputNombre.value;
    let precio=parseFloat(inputPrecio.value);
    let cantidad=parseFloat(inputCantidad.value);
    let categoria=inputCategoria.value;
    if(nombre!=""&&precio!=isNaN&&cantidad!=isNaN)
    {
    if(cantidad>=0)
    {
        if(precio>0)
        {
        let producto= new Producto(id,nombre,cantidad,precio,categoria);
        id+=1;//Crear id unicos
        productos.push(producto);
        imprimirEstadisticas();
        formulario.reset();//Reinicia el nodo formulario evitando que se dupliquen el HTML agregado de los articulos en el innerHTML
        imprimirProductos();//Muestra los productos en el HTML
    }
        else
        {
            alert("Debe ingresar un precio mayor a cero");
        }
    }
    else
    {
        alert("No se permite ingresar una cantidad de productos negativa");
    }
    }
    else
    {
        alert("Debe ingresar todos los parámetros solicitados");
    }
}
/* funcion para eliminar productos */
function eliminarProducto(idProducto)
{
    let columnaABorrar=document.getElementById(`columna-${idProducto}`);
    let indexABorrarDelArray=productos.findIndex((producto)=>Number(producto.id)===Number(idProducto));//Manda cada objeto de producto y lo compara con su valor dado por el parametro de entrada id si son iguales obtiene el indice del arrayProdcutos que corresponde a la posición del array que se desea borrar
    productos.splice(indexABorrarDelArray,1);//Quita del array de productos el producto con id dado por el parametro
    columnaABorrar.remove();//Remueve el HTML del producto mostrado

    /* PARA LAS ESTADISTICAS */
    let columnaEstadisticaBorrar=document.getElementById("Estadisticas-Inventario");
    columnaEstadisticaBorrar.remove();
    imprimirEstadisticas(); 

}
/* Imprimir los productos con codigo HTML DOM */
function imprimirProductos(){
    contenedorProductos.innerHTML="";//Crear el espacio para imprimir el HTML en el contenedor
    productos.forEach((producto)=>{
        let column=document.createElement("div");
        column.className="col-md-4 mt-2";
        column.id=`columna-${producto.id}`;
        column.innerHTML=`
    <div class="card">
            <img class="card-img-top style="width:300px" src="./Imagenes/Postres.svg" alt="Card café">
        <div class="card-body">
            <h4 class="card-title">
            ID:<strong> ${producto.id}: ${producto.nombre}</strong>
            </h4>
            <h4 class="card-title">
            <strong>${producto.categoria}</strong>
            </h4>
            <p class="card-text">
            <strong>Cantidad:</strong> ${producto.cantidad} PZ
            </p>
            <p class="card-text">
            <strong>Precio unitario:</strong>$ ${producto.precio}
            </p>
        </div>
            <div class="card-footer">
            <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
            </div>
    </div>
        `;
        contenedorProductos.append(column);//agregar el objeto column
        let botonEliminarProducto=document.getElementById(`botonEliminar-${producto.id}`);
        botonEliminarProducto.onclick=()=>eliminarProducto(producto.id);//Si el evento de apretar el boton eliminar pasa activa la arrow del metodo elimianr el producto.id
    });//Termina foreach
}
/* Imprimir estadisticas de inventario */
function imprimirEstadisticas()
{
    estadisticas.innerHTML="";
    let column=document.createElement("div");
    column.className="card badge-primary rounded";
    column.id="Estadisticas-Inventario";
    column.innerHTML=`
    <div class="card-body">
        <div class="card-title text-center"><h4>Valor total de inventario</h4></div>
        <div class="card-title text-center"><h4>$ ${calcularCosto(productos)}</h4></div>
        <div class="card-title text-center"><h4>Cantidad de productos</h4></div>
        <div class="card-title text-center"><h4>${calcularTotal(productos)} pz</h4></div>
        <div class="card-title text-center"><h4>Producto a resurir</h4></div>
        <div class="card-title text-center"><h4>${calcularMin(productos)}</h4></div>
    </div>
    `;
    estadisticas.append(column);
}
/* funcionalidades de la pagina */
/* Calcular costo del inventario */
function calcularCosto(productos)
{
    let costoTotalInventario=0;
    
    for(let producto of productos)
    {
        costoTotalInventario+=producto.calcularCosto();
    }
    return costoTotalInventario;
}
function calcularTotal(productos) {
    let totalDeProductos=0;
    for(let producto of productos)
    {
        totalDeProductos+=producto.calcularTotalDeProductos();
    }
    return totalDeProductos;
}
function calcularMin(productos)
{
    let minVal;
    let minArr=productos;
    minArr.sort((a,b)=>a.cantidad-b.cantidad);//Obtiene el producto con menor cantidad de piezas
    minVal=(minArr[0]).nombre;
    return minVal;
}
/* Fuction main */
function main()
{
    inicializarElementos();
    InicializarEventos();
}
main();

