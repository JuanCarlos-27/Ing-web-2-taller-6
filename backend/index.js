import './config/env.js'; // Configuración de variables de entorno para guardar credenciales
import express from 'express';
import router from './routes/index.js'; // Importamos el router
import { corsMiddleware } from './utils/utils.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Backend de la aplicación para comentarios</h1>
    <p>Las rutas son:</p>
    <ul>
      <li>POST /api/reviews</li>
      <li>GET /api/reviews</li>
      <li>GET /api/reviews/:hostId</li>
      <li>PUT /api/reviews</li><li>DELETE /api/reviews/:id</li>
    </ul>
    <p>Created by <a href="https://github.com/JuanCarlos-27">Juan C. Romero</a></p>
    `);
});

app.use(express.json()); // Middleware para parsear el body a JSON
app.use(corsMiddleware()); // Middleware para habilitar CORS
app.use('/api', router);

// Si es exito agregarle al response la propiedad success

// Levantamos el servidor
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
