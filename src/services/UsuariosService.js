import Service from './Service';

// Operaciones
export default {
  // Devuelve por id
  async getById(uid) {
    const res = await Service.usuariosColeccion.doc(uid).get();
    return res.data();
  },
  // Crea uno nuevo
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es-419#web
  async post(uid, data) {
    const res = await Service.usuariosColeccion.doc(uid).set(data);
    return res.user;
  },

};
