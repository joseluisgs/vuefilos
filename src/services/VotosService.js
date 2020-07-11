import Service from './Service';

// Operaciones
export default {
  // Obtiene un recurso
  async get(id) {
    const res = await Service.votosColeccion.doc(id).get();
    return res;
  },
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  async post(uid, data) {
    const res = await Service.votosColeccion.doc(uid).set(data);
    return res;
  },

};
