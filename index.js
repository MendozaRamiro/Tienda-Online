import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());


const productos = JSON.parse(fs.readFileSync('./json/productos.json', 'utf-8'));
const usuarios = JSON.parse(fs.readFileSync('./json/usuarios.json', 'utf-8'));
const ventas = JSON.parse(fs.readFileSync('./json/ventas.json', 'utf-8'));





app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});


app.get('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send('Usuario no encontrado');
  res.json(user);
});


app.post('/usuarios', (req, res) => {
  usuarios.push(req.body);

  fs.writeFileSync('./json/usuarios.json', JSON.stringify(usuarios, null, 2));

  res.send('Usuario creado');
});


app.put('/usuarios/:id', (req, res) => {
  const user = usuarios.find(u => u.id == req.params.id);
  if (!user) return res.status(404).send('Usuario no encontrado');

  user.nombre = req.body.nombre || user.nombre;
  user.apellido = req.body.apellido || user.apellido;

  fs.writeFileSync('./json/usuarios.json', JSON.stringify(usuarios, null, 2));

  res.send('Usuario actualizado');
});

app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;

  const tieneVentas = ventas.some(v => v.id_usuario == id);
  if (tieneVentas) {
    return res.status(400).send('No se puede eliminar usuario con ventas');
  }

  const index = usuarios.findIndex(u => u.id == id);
  if (index !== -1) {
    usuarios.splice(index, 1);

    fs.writeFileSync('./json/usuarios.json', JSON.stringify(usuarios, null, 2));
  }

  res.send('Usuario eliminado');
});





app.get('/productos', (req, res) => {
  res.json(productos);
});


app.post('/productos', (req, res) => {
  productos.push(req.body);

  fs.writeFileSync('./json/productos.json', JSON.stringify(productos, null, 2));

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
    return res.status(400).send('Producto inválido');
  }

  ventas.push(nueva);

  fs.writeFileSync('./json/ventas.json', JSON.stringify(ventas, null, 2));

  res.send('Venta creada');
});




app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});