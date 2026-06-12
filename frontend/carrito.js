const contenedor =
  document.getElementById('carrito');

const totalHTML =
  document.getElementById('total');

let total = 0;



let carrito =

  JSON.parse(
    localStorage.getItem('carrito')
  ) || [];



if(carrito.length === 0){

  contenedor.innerHTML =

    `
      <h2>
        El carrito está vacío 
      </h2>
    `;

}





carrito.forEach(producto => {

  total += producto.precio;



  contenedor.innerHTML += `

    <div class="item-carrito">

      <img
        src="${producto.imagen}"
      >

      <div class="item-info">

        <h3>
          ${producto.nombre}
        </h3>

        <p>
          ${producto.desc}
        </p>

      </div>

      <p class="precio">
        $${producto.precio}
      </p>

    </div>

  `;

});



totalHTML.innerText =

  'Total: $' + total;





function comprar(){

  const token =
    localStorage.getItem('token');

  let productosCompra =

    carrito.map(producto => ({

      id_producto: producto.id,

      cantidad: 1

    }));


  fetch('/ventas', {

    method:'POST',

    headers:{

      'Content-Type':'application/json',

      'Authorization': token

    },

    body: JSON.stringify({

      id: Date.now(),

      id_usuario: 1,

      fecha: '2026-06-12',

      total: total,

      direccion: 'Salto',

      productos: productosCompra,

      pagado: true

    })

  })

  .then(res => res.text())

  .then(data => {

    alert(data);

    localStorage.removeItem('carrito');

    window.location.href =
      'tienda.html';

  });

}