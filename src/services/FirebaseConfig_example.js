// Configuración de firebase si lo quieresponer oculto
// renombra este fichero como FirebaseConfig.js
// https://firebase.google.com/docs/web/setup?hl=es
export default {
  apiKey: 'una_key',
  authDomain: 'mi_app.firebaseapp.com',
  databaseURL: 'https://mi_app.firebaseio.com',
  projectId: 'mi_app',
  storageBucket: 'mi_app.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:123456789ffff',
};

// Configuramos Firebase desde env
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIRE_API_KEY,
//   authDomain: process.env.VUE_APP_FIRE_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_FIRE_DATABASE_URL,
//   projectId: `${process.env.VUE_APP_FIRE_PROJECT_ID}`,
//   storageBucket: process.env.VUE_APP_FIRE_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_FIRE_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_FIRE_APP_ID,
// };
