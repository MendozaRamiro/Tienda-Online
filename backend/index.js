import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Usuario from './models/Usuario.js';
import Producto from './models/Producto.js';
import Venta from './models/Venta.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB conectado');
})
.catch(error => {
  console.log(error);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, '../frontend')
  )
);



app.get('/usuarios', async (req, res) => {

  const usuarios = await Usuario.find();

  res.json(usuarios);

});



app.post('/usuarios', async (req, res) => {

  try {

    const passwordEncriptada =
      await bcrypt.hash(req.body.contraseña, 10);

    const nuevoUsuario = new Usuario({

      id: Date.now(),

      nombre: req.body.nombre,

      contraseña: passwordEncriptada,

      activo: true

    });

    await nuevoUsuario.save();

    res.send('Usuario creado');

  }

  catch(error){

    console.log(error);

    res.status(500).send('Error');

  }

});



app.post('/login', async (req, res) => {

  const { nombre, contraseña } = req.body;

  const usuario = await Usuario.findOne({
    nombre
  });

  if(!usuario){

    return res.status(401).json({
      mensaje:'Usuario no encontrado'
    });

  }

  const valida =
    await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );

  if(!valida){

    return res.status(401).json({
      mensaje:'Contraseña incorrecta'
    });

  }

  const token = jwt.sign(

    {
      id: usuario.id,
      nombre: usuario.nombre
    },

    process.env.JWT_SECRET,

    {
      expiresIn:'1h'
    }

  );

  res.json({
    token,
    usuario: usuario.nombre
  });

});


app.get('/productos', async (req, res) => {

  const productos =
    await Producto.find();

  res.json(productos);

});



app.get('/ventas', async (req, res) => {

  const ventas =
    await Venta.find();

  res.json(ventas);

});


app.post('/ventas', async (req, res) => {

  try{

    const token =
      req.headers.authorization;

    if(!token){

      return res.status(401).send(
        'Token requerido'
      );

    }

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const nuevaVenta =
      new Venta(req.body);

    await nuevaVenta.save();

    res.send(
      'Compra realizada'
    );

  }

  catch(error){

    res.status(401).send(
      'Token inválido'
    );

  }

});


app.get('/', (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      '../frontend/login.html'
    )
  );

});

app.listen(3000, () => {

  console.log(
    'Servidor corriendo en puerto 3000'
  );

});