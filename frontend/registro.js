function registrar(){

  const usuario =
    document.getElementById('nuevoUsuario').value;

  const password =
    document.getElementById('password').value;

  if(usuario === '' || password === ''){

    alert('Completá todos los campos');
    return;

  }

  fetch('/usuarios', {

    method:'POST',

    headers:{
      'Content-Type':'application/json'
    },

    body: JSON.stringify({

      id: Date.now(),

      nombre: usuario,

      contraseña: password,

      activo: true

    })

  })

  .then(res => res.text())

  .then(() => {

    alert('Usuario registrado');

    window.location.href =
      'login.html';

  });

}