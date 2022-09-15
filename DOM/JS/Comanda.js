let id=0;//ID de productos
let idCar=0;
let productos=[];//Arreglo de productos disponibles para comprar
let carrito=[];//Carrito de compras
/* Clase productos */
class Producto{
    constructor(nombre,categoria, precio,cantidad)
    {
        this.id=id+1;//Made unique id (Similar to static value)
        id=this.id;
        this.nombre=nombre.toUpperCase();
        this.categoria=categoria.toUpperCase();
        this.precio=precio;
        this.cantidad=cantidad;
    }
    /* Methodos de producto */
    calcularCosto=()=>this.cantidad*this.precio;
}
/* carrito de compras */
class CarritoDeCompras{
    constructor(nombre,subTotal, cantidad)
    {
        this.idCar=idCar+1;//Made unique id (Similar to static value)
        idCar=this.idCar;
        this.nombre=nombre;
        this.subTotal=subTotal;
        this.cantidad=cantidad;
    }
}
/* All functions */

/* Función de validacion de cantidades */
function validarCantidad(cantidad)
{
    let result=cantidad;
    do{
    if(result!="")
    {
        result=parseInt(result);
        if(result!=isNaN&&result>0)
        {
            return result;
        }
        else if(result<0)
        {
            result=prompt("Valores negativos no son permitidos\n Ingresa una opción válida");
        }
        else
        {
            result=prompt("No se permite ingresar letras\n Ingresa una opción válida:");
        }
    }
    else
    {
        result=prompt("Debes ingresar algún valor:");
    }
    }while(true);
}
/* Función de validacion de nombres */
function validarNombre(nombre)
{
    let result=nombre;
    do{
    if(result!="")
    {
        return result;
    }
    else
    {
        result=prompt("Debes ingresar algún valor:");
    }
    }while(true);
}
/* Menu fuction */
function menu()
{
    let opcion=validarNombre(prompt("LA BIBLIOTECA CAFETERÍA (Introduce ESC para salir)\n ¿Que deseas hacer?\n1.Agregar artículos al menú\n2.Generar pedido"));
    return opcion;
}
/* Agregar nuevo producto */
function agregarProductos(productos){
    let numeroProductos;
    numeroProductos=validarCantidad(prompt("Cuantos productos se van a registrar"));
    for(let index=0; index<numeroProductos; index++)
    {
        let nombre=validarNombre(prompt("Ingrese el nombre"));
        let categoria=validarNombre(prompt("Ingresa la categoría"));   
        let precio=parseFloat(validarCantidad(prompt("Ingresa el precio de venta")));
        let cantidad=validarCantidad(prompt("Ingresa la cantidad"));
    /* Creacion de objetos o productos */
    let productoARegistrar=new Producto(nombre,categoria,precio,cantidad);
    alert(`Se ha agregado satisfactoriamente el producto:\nID: ${id}\nNombre: ${productoARegistrar.nombre}\nCantidad:${productoARegistrar.cantidad} `);
/* agregarlo al arreglo */
productos.push(productoARegistrar);
}
return productos;
}
/* Mensaje para filtros */
function mensajeFiltrar()
{
    return validarCantidad(prompt("Deseas filtrar los productos\n1.No filtrar\n2.Por categoría\n3.Por Precio mayor a menor\n4.Por precio menor a mayor"));
}
/* Función para filtrar */
function filtrar(productos)
{
    let opcion;
    let opt=0;
    do{
    opcion=parseInt(mensajeFiltrar());
    switch(opcion)
    {
        case 1://No filtra
            opt=1;
            break;
        case 2://Filtra en orden alfabetico
            productos.sort((a,b)=>{
                if(a.categoria>b.categoria)
                {
                    return 1;
                }
                else if(a.categoria<b.categoria)
                {
                    return -1;
                }
                else
                {
                    return 0;
                }
            });
            opt=1;
            break;
        case 3://Filtra en orden acendente de precio
            productos.sort((a,b)=>b.precio-a.precio);
        opt=1;
        break;
        case 4://Filtra en orden descendente de precio
            productos.sort((a,b)=>a.precio-b.precio);
            opt=1;
            break;
        default:
            alert("Opcion invalida");
    }
    }while(opt!=1);
    return productos;
}
/* Calcular costo del inventario */
function calcularCosto(productos)
{
    costoTotalInventario=0;
    for(let producto of productos)
    {
        costoTotalInventario+=producto.calcularCosto();
    }
    return costoTotalInventario.toString();
}
/* Funcion de menú dinámico */
function crearMensaje(productos){
    let mensaje="Que producto deseas comprar?";
    let count=1;
    for(let producto of productos)
    {
        mensaje+=`\n${count}. ${producto.nombre} (${producto.categoria})- $${producto.precio} (Stock: ${producto.cantidad})`;
        count++;
    }
    mensaje+=`\n${count}.Pagar ahora`;
    return mensaje;
}
/* Mensaje dinamico de carrito de compras */
function crearMensajeCarrito(carrito){
    let mensaje="CARRITO DE COMPRAS";
    let count=1;
    for(let car of carrito)
    {
        mensaje+=`\n${count}. Nombre:${car.nombre}- Cantidad:${car.cantidad}- Total: $${car.subTotal}`;
        count++;
    }
    mensaje+=`\nPagar ahora`;
    return mensaje;
}
/* imprimir mensaje para cantidades agregadas a carrito */
function cantidad(producto){
    opcion=prompt(`¿Cuantas unidades de ${producto.nombre} deseas comprar?`);
    return validarCantidad(opcion);
}
/* Generar un subtotal de pago */
function calcularSubtotal(cantidad,producto){
    alert(`Se agregó al carrito ${cantidad} pzas de ${producto.nombre} por $${cantidad*producto.precio}`);
    return cantidad*producto.precio;
}
/* Total a pagar */
function calcularTotal(arr){
return arr.reduce((acumulador,elemento)=>acumulador+elemento,0);//Suma cada elemento del arreglo 
}
/* DOM */
/* Funcion de creación de cards de articulos nuevos DOM */
function crearProducto(productos)
{
    let contenedorProductos = document.getElementById("contenedor-productos");
    for(let producto of productos)
    {
        let column=document.createElement("div");
        column.className="card ml-3";
        column.id=`columna-${producto.id}`;
        column.innerHTML=`
    <div class="card ml-3" style="width:300px">
        <img class="card-img-top" src="../Imagenes/Cafebase.jpg" alt="Card café">
        <div class="card-body">
            <h4 class="card-title">${producto.nombre}</h4>
            <p class="card-text">$${producto.precio}</p>
            <p class="card-text"><strong>Cantidad: ${producto.cantidad}pz</strong></p>
            <a href="#" class="btn btn-primary">Agregar a pedido</a>
        </div>
    </div>
        `;
        contenedorProductos.append(column);
    }
}
/* Funcion crear carrito de compras ---------------------------------------------------------------AQUIMEQUEDE*/
function crearCarritoDeCompras(carrito)
{
    let contenedorCarritodeCompras=document.getElementById("contenedor-carrito");
    for(let car of carrito)
    {
        let column=document.createElement("div");
        column.className="card ml-3";
        column.id=`columna-${car.nombre}`;
    column.innerHTML=`
    <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-5 ">
            <img src="../Imagenes/Cafebase.jpg" class="img-fluid rounded-start"
                alt="cafe de compra">
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h6 class="card-title">${car.nombre}</h6>
                <h6 class="card-text">$${car.subTotal}
                    <button class="btn btn-info"><i class="fa-solid fa-circle-plus"></i></button>
                    <button class="btn btn-info"><i class="fa-solid fa-circle-minus"></i></button>
                </h6>
                <h6 class="card-title"><small class="text-muted">Cantidad:${car.cantidad} PZ</small></h6>
            </div>
        </div>
    </div>
    </div>
    `;
    contenedorCarritodeCompras.append(column);
    }
}
/* Función de carrito de compras */
function CarritoCompras()
{
let total=[];//Total a pagar 
let opcion=menu();
while(opcion.toLowerCase()!="esc")
{
    carrito=[];//Vacia el carrito despues de cada compra
    if(opcion!=""&&opcion.toLowerCase()!="esc")
    {
        opcion=parseInt(opcion);
        if(opcion!=isNaN)
        {
            switch(opcion)
            {
                case 1://Add new product
                productos=agregarProductos(productos);
                alert(`Estatus actual de inventario:\nCantidad de productos diferentes: ${productos.length}\nValor de inventario:$ ${calcularCosto(productos)}`);
                crearProducto(productos);
                    break;
                case 2://Create add a list of product to buy               
                    do{
                        opcionCompra=parseInt(prompt(crearMensaje(filtrar(productos))));
                        if( opcionCompra==productos.length+1)
                        {
                            alert(crearMensajeCarrito(carrito));
                            alert(`Su total fue de: $ ${calcularTotal(total)}\n Gracias por su compra`);
                            break;
                        }
                        let qty=cantidad(productos[opcionCompra-1]);
                        if(qty<=productos[opcionCompra-1].cantidad)//Valida si el stock es positivo sino no ejecuta el guardado del carrito
                        {
                            productos[opcionCompra-1].cantidad-=qty;//Descontar del stock
                            let product=productos[opcionCompra-1];
                            let subtotal=calcularSubtotal(qty,product);
                            let productoARegistrar=new CarritoDeCompras(product.nombre,subtotal,qty);
                            carrito.push(productoARegistrar);
                            total.push(subtotal);
                        }
                        else{alert(`El producto no tiene stock`);}
                    } while(true);
                break;   
                default:
                    alert("Ingrese una opción válida");
                    opcion=menu();
            }
            console.log(carrito);
            crearCarritoDeCompras(carrito);
        }
    else
    {
        alert("Ingresó una letra");
        opcion=menu();
    }
    opcion=menu();
    }
}
}
/* Función principal o main */
function main()
{
    CarritoCompras();
}
main();