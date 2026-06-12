function iniciarSesion(){

  const usuario =
    document.getElementById('usuario').value;

  const password =
    document.getElementById('password').value;

  fetch('/login', {

    method:'POST',

    headers:{
      'Content-Type':'application/json'
    },

    body: JSON.stringify({

      nombre: usuario,

      contraseña: password

    })

  })

  .then(res => res.json())

  .then(data => {

    if(data.token){

      localStorage.setItem(
        'token',
        data.token
      );

      localStorage.setItem(
        'usuario',
        data.usuario
      );

      window.location.href =
        'tienda.html';

    }
    else{

      alert(
        'Usuario o contraseña incorrectos'
      );

    }

  });

}