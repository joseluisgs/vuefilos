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
  login(email, password) {
    const res = Auth.signInWithEmailAndPassword(email, password);
    return res.user;
  },
  // Realiza el login con Google
  // https://firebase.google.com/docs/auth/web/google-signin?hl=es_419
  loginGoogle() {
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    const res = Auth.signInWithPopup(Service.providerGoogle);
    return res.user;
  },
  // Realiza el logout
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  logout() {
    return Auth.signOut();
  },
  // Realiza el Registro
  // https://firebase.google.com/docs/auth/web/manage-users?hl=es_419
  async register(email, password) {
    const res = await Auth.createUserWithEmailAndPassword(email, password);
    return res.user;
  },
};
