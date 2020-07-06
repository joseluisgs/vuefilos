import Service from './Service';

// Operaciones
export default {
  // Devuelve por id
  async getById(uid) {
    const user = await Service.usuariosColeccion.doc(uid).get();
    return user;
  },
};
