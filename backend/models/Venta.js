import mongoose from 'mongoose';

const VentaSchema = new mongoose.Schema({

  id: Number,

  id_usuario: Number,

  fecha: String,

  total: Number,

  direccion: String,

  productos: Array,

  pagado: Boolean

});

export default mongoose.model(
  'Venta',
  VentaSchema
);