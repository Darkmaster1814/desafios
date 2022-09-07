/* Global variables */
let id=0;//ID
let productos;
/* Classes */
class Producto{
    constructor(nombre, precio,cantidad)
    {
        this.id=id+1;//Made unique id (Similar to static value)
        id=this.id;
        this.nombre=nombre.toUpperCase();
        this.precio=precio;
        this.cantidad=cantidad;
    }
    /* Methodos de producto */
    calcularCosto=()=>this.cantidad*this.precio;
}
class CarritoDeCompras{
    constructor(nombre,subTotal, cantidad)
    {
        this.nombre=nombre;
        this.subTotal=subTotal;
        this.cantidad=cantidad;
    }
}
/* All functions */
/* Menu fuction */
function menu()
{
    let opcion=prompt("LA BIBLIOTECA CAFETERÍA (Introduce ESC para salir)\n ¿Que deseas hacer?\n1.Agregar artículos al menú\n2.Generar pedido");
    return opcion;
}
/* Agregar nuevo producto */
function agregarProductos(){
    let productos=[];//Array vacio 
    let numeroProductos=parseInt(prompt("Cuantos productos se van a registrar"));
    for(let index=0; index<numeroProductos; index++)
    {
        let nombre=prompt("Ingrese el nombre");
        let precio=parseFloat(prompt("Ingresa el precio de venta"));
        let cantidad=parseInt(prompt("Ingresa la cantidad"));   
    /* Creacion de objetos o productos */
    let productoARegistrar=new Producto(nombre,precio,cantidad);
    alert(`Se ha agregado satisfactoriamente el producto:\nID: ${id}\nNombre: ${productoARegistrar.nombre}\nCantidad:${productoARegistrar.cantidad} `);
/* agregarlo al arreglo */
productos.push(productoARegistrar);
}
return productos;
}
/* Mostrar producto */
function mostrarProductos(productos, numeroProducto)
{
        console.log("Id producto: "+productos[numeroProducto].id+"\nNombre: "+ productos[numeroProducto].nombre+"\nPrecio: "+productos[numeroProducto].precio+"\nCantidad: "+productos[numeroProducto].cantidad);/* por objeto se imprime el nombre a traves de los metodos del objeto */
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
        mensaje+=`\n${count}. ${producto.nombre}- $${producto.precio} (Stock: ${producto.cantidad})`;
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
    return prompt(`¿Cuantas unidades de ${producto.nombre} deseas comprar?`);
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

/* Options of program function */
function CarritoCompras()
{
let total=[];//Total a pagar
let carrito=[];
let opcion=menu();

while(opcion.toLowerCase()!="esc")
{
    if(opcion!=""&&opcion.toLowerCase()!="esc")
    {
        option=parseInt(opcion);
        if(option!=isNaN)
        {
            switch(option)
            {
                case 1://Add new product
                productos=agregarProductos();
                alert(`Estatus actual de inventario:\n Cantidad de productos diferentes: ${productos.length}\nValor de inventario:$ ${calcularCosto(productos)}`);
                    break;
                case 2://Create add a list of product to buy               
                    do{
                        opcionCompra=parseInt(prompt(crearMensaje(productos)));
                        if( opcionCompra==productos.length+1)
                        {
                            //
                            alert(crearMensajeCarrito(carrito));
                            alert(`Su total fue de: $ ${calcularTotal(total)}\n Gracias por su compra`);
                            break;
                        }
                        let qty=cantidad(productos[opcionCompra-1]);
                        let product=productos[opcionCompra-1];
                        let subtotal=calcularSubtotal(qty,product);
                        let productoARegistrar=new CarritoDeCompras(product.nombre,subtotal,qty);
                        carrito.push(productoARegistrar);
                        total.push(subtotal);
                    } while(true);console.log(carrito);
                break;   
                default:
                    alert("Ingrese una opción válida");
                    opcion=menu();
            }
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
CarritoCompras();