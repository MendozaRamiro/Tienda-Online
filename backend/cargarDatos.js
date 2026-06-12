import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

import Usuario from './models/Usuario.js';
import Producto from './models/Producto.js';
import Venta from './models/Venta.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

    console.log('MongoDB conectado');

    const usuarios = JSON.parse(
        fs.readFileSync('./json/usuarios.json','utf-8')
    );

    const productos = JSON.parse(
        fs.readFileSync('./json/productos.json','utf-8')
    );

    const ventas = JSON.parse(
        fs.readFileSync('./json/ventas.json','utf-8')
    );

    await Usuario.deleteMany({});
    await Producto.deleteMany({});
    await Venta.deleteMany({});

    await Usuario.insertMany(usuarios);
    await Producto.insertMany(productos);
    await Venta.insertMany(ventas);

    console.log('Datos cargados correctamente');

    process.exit();

})

.catch(error => {

    console.log(error);

});