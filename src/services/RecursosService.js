import Service from './Service';

// Operaciones
export default {
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  async post(data) {
    const res = await Service.recursosColeccion.add(data);
    return res;
  },
  // Elimina un recurso
  async delete(id) {
    return Service.recursosColeccion.doc(id).delete();
  },
};