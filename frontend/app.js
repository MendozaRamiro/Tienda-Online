const contenedor =
  document.getElementById('productos');

const bienvenida =
  document.getElementById('bienvenida');



const usuario =
  localStorage.getItem('usuario');



if(!usuario){

  window.location.href =
    'login.html';

}



bienvenida.innerText =
  'Bienvenido ' + usuario ;



let todosLosProductos = [];



fetch('/productos')

  .then(res => res.json())

  .then(productos => {

    todosLosProductos = productos;

    mostrarProductos(productos);

  })

  .catch(error => {

    console.log(error);

  });





function mostrarProductos(productos){

  contenedor.innerHTML = '';



  productos.forEach(producto => {

    contenedor.innerHTML += `

      <div class="card">

        <img
          src="${producto.imagen}"
          class="imagen-producto"
        >

        <div class="info">

          <h2>
            ${producto.nombre}
          </h2>

          <p class="descripcion">
            ${producto.desc}
          </p>

          <p class="precio">
            $${producto.precio}
          </p>

          <span class="categoria">
            ${producto.categoria}
          </span>

          <button
            class="boton-carrito"
            onclick="agregarCarrito(${producto.id})"
          >
            Agregar al carrito
          </button>

        </div>

      </div>

    `;

  });

}





function filtrarProductos(categoria){

  if(categoria === 'Todos'){

    mostrarProductos(
      todosLosProductos
    );

    return;

  }



  const filtrados =

    todosLosProductos.filter(producto =>

      producto.categoria === categoria

    );



  mostrarProductos(filtrados);

}





function agregarCarrito(id){

  let carrito =

    JSON.parse(
      localStorage.getItem('carrito')
    ) || [];



  const producto =

    todosLosProductos.find(p => p.id === id);



  carrito.push(producto);



  localStorage.setItem(

    'carrito',

    JSON.stringify(carrito)

  );



  alert('Producto agregado al carrito');

}
function logout(){

  localStorage.removeItem(
    'usuario'
  );

  window.location.href =
    'login.html';

}