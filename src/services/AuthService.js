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
  async login(email, password) {
    const res = await Auth.signInWithEmailAndPassword(email, password);
    return res.user;
  },
  // Realiza el login con Google
  // https://firebase.google.com/docs/auth/web/google-signin?hl=es_419
  async loginGoogle() {
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    const res = await Auth.signInWithPopup(Service.providerGoogle);
    return res.user;
  },
  // Realiza el logout
  // https://firebase.google.com/docs/auth/web/password-auth?hl=es_419
  async logout() {
    return Auth.signOut();
  },
  // Realiza el Registro
  // https://firebase.google.com/docs/auth/web/manage-users?hl=es_419
  async register(email, password) {
    const res = await Auth.createUserWithEmailAndPassword(email, password);
    return res.user;
  },
  // Recupera al password dado un email
  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendpasswordresetemail
  async reset(email) {
    return Auth.sendPasswordResetEmail(email);
  },
};
