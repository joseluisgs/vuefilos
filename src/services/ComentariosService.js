import Service from './Service';

// Operaciones
export default {
  // Obtiene un recurso
  async get(id) {
    const res = await Service.comentariosColeccion.doc(id).get();
    return res;
  },
  // Crea uno nuevo
  async post(data) {
    const res = await Service.comentariosColeccion.add(data);
    return res;
  },
  // Obtiene los comentarios de un usuario
  async getByUser(uid) {
    return Service.comentariosColeccion.where('usuarioId', '==', uid).get();
  },
  // Actualiza un comentario
  async put(id, data) {
    return Service.comentariosColeccion.doc(id).update(data);
  },

};
