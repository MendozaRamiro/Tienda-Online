function registrar(){

  const usuario =
    document.getElementById('nuevoUsuario').value;

  if(usuario === ''){

    alert('Ingresá usuario');

    return;
  }

  localStorage.setItem(
    'usuario',
    usuario
  );

  alert('Cuenta creada');

  window.location.href =
    'login.html';
}