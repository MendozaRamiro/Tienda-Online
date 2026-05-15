function iniciarSesion(){

  const usuario =
    document.getElementById('usuario').value;

  if(usuario === ''){

    alert('Ingresá un usuario');

    return;
  }

  localStorage.setItem(
    'usuario',
    usuario
  );

  window.location.href =
    'tienda.html';
}