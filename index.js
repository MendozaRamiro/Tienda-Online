const express = require('express');
const app = express();

app.use(express.json());

let productos = require('./json/productos.json');
let usuarios = require('./json/usuarios.json');
let ventas = require('./json/ventas.json');



app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send('No encontrado');
  res.json(user);
});

app.post('/usuarios', (req, res) => {
  usuarios.push(req.body);
  res.send('Usuario creado');
});

app.put('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send('No encontrado');

  user.nombre = req.body.nombre || user.nombre;
  user.apellido = req.body.apellido || user.apellido;

  res.send('Usuario actualizado');
});

app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  const tieneVentas = ventas.some(v => v.id_usuario == id);
  if (tieneVentas) {
    return res.status(400).send('No se puede eliminar, tiene ventas');
  }

  usuarios = usuarios.filter(u => u.id != id);

  res.send('Usuario eliminado');
});



app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
  productos.push(req.body);
  res.send('Producto creado');
});



app.get('/ventas', (req, res) => {
  res.json(ventas);
});

app.post('/ventas', (req, res) => {
  const nueva = req.body;

  const usuarioExiste = usuarios.some(u => u.id == nueva.id_usuario);
  if (!usuarioExiste) {
    return res.status(400).send('Usuario no existe');
  }

  const productosValidos = nueva.productos.every(p =>
    productos.some(prod => prod.id == p.id_producto)
  );

  if (!productosValidos) {
    return res.status(400).send('Producto no válido');
  }

  ventas.push(nueva);

  res.send('Venta creada');
});



app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
