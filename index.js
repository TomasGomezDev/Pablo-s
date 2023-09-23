const express = require('express');
const app = express();
const path = require('path'); // Importa el módulo 'path' de Node.js
const port = 3000; // Puedes cambiar el puerto según tus preferencias

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  // Utiliza path.join para obtener la ruta completa del archivo HTML
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// Ruta para la pantalla de inicio del juego
app.get('/game', (req, res) => {
  // Utiliza path.join para obtener la ruta completa del archivo HTML
  res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

// Ruta para el marcador
app.get('/scoreBoard', (req, res) => {
  // Utiliza path.join para obtener la ruta completa del archivo HTML
  res.sendFile(path.join(__dirname, 'public', 'scoreBoard.html'));
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
