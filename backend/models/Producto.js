import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({

  id: Number,

  nombre: String,

  categoria: String,

  desc: String,

  precio: Number,

  imagen: String,

  stock: Number,

  activo: Boolean

});

export default mongoose.model(
  'Producto',
  ProductoSchema
);