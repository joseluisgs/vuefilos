import Service from './Service';

// Recurso
const Auth = Service.auth;

// Operaciones
export default {
  // devuelve el usuario actual
  getUsuarioActivo() {
    return Auth.currentUser;
  },
};
