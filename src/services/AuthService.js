import Service from './Service';

// Recurso
const Auth = Service.auth;

// Operaciones
export default {
  // devuelve el usuario actual
  getUsuarioActivo() {
    return Auth.currentUser;
  },
  // Realiza el Login
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  login(data) {
    return Auth.signInWithEmailAndPassword(data.email, data.password);
  },
  // Realiza el login con Google
  // https://firebase.google.com/docs/auth/web/google-signin?hl=es_419
  loginGoogle() {
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    return Auth.signInWithPopup(Service.providerGoogle);
  },
  // Realiza el logout
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  logout() {
    return Auth.signOut();
  },
};
