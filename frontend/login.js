function iniciarSesion(){

  const usuario =
    document.getElementById('usuario').value;

  const password =
    document.getElementById('password').value;

  if(usuario === '' || password === ''){

    alert('Completá todos los campos');
    return;

  }

  fetch('/usuarios')

  .then(res => res.json())

  .then(usuarios => {

    const existe = usuarios.find(

      u =>
        u.nombre === usuario &&
        u.contraseña === password

    );

    if(existe){

      localStorage.setItem(
        'usuario',
        usuario
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