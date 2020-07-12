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

};
