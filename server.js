// Servidor para procesar la distribución een proyectos estáticos
// por si no tenemos un servidor listo, lo creamos con Node.js/Express
// y servimos el documento de distribución
const express = require('express');
const serveStatic = require('serve-static');
const { join } = require('path');
const history = require('connect-history-api-fallback');

const app = express();

// Directorio de donde buscar las páginas web
// Indiocamos el modo historia imprsescidible para SPA
app.use('/', serveStatic(join(__dirname, '/dist')));
app.use(history());

// Cargamos index.
app.get(/.*/, (req, res) => {
  res.sendFile(join(__dirname, '/dist/index.html'));
});

// Lanzamos el servidor
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`⚑ Servidor para Vue.js listo ✓ -> http://localhost:${port}`);
