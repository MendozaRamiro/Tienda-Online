import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({

  nombre: String,

  apellido: String,

  email: String,

  contraseña: String,

  activo: Boolean

});

export default mongoose.model(
  'Usuario',
  UsuarioSchema
);