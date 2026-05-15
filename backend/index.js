import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json());



app.use(
  express.static(
    path.join(__dirname, '../frontend')
  )
);





const productos = JSON.parse(
  fs.readFileSync('./json/productos.json', 'utf-8')
);

const usuarios = JSON.parse(
  fs.readFileSync('./json/usuarios.json', 'utf-8')
);

const ventas = JSON.parse(
  fs.readFileSync('./json/ventas.json', 'utf-8')
);





app.get('/usuarios', (req, res) => {

  res.json(usuarios);

});





app.post('/usuarios', (req, res) => {

  usuarios.push(req.body);

  fs.writeFileSync(
    './json/usuarios.json',
    JSON.stringify(usuarios, null, 2)
  );

  res.send('Usuario creado');

});





app.get('/productos', (req, res) => {

  res.json(productos);

});





app.get('/ventas', (req, res) => {

  res.json(ventas);

});





app.post('/ventas', (req, res) => {

  const nueva = req.body;

  ventas.push(nueva);

  fs.writeFileSync(
    './json/ventas.json',
    JSON.stringify(ventas, null, 2)
  );

  res.send('Compra realizada');

});





app.get('/', (req, res) => {

  res.sendFile(
    path.join(__dirname, '../frontend/login.html')
  );

});





app.listen(3000, () => {

  console.log('Servidor corriendo en puerto 3000');

});