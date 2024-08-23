import './config/env.js'; // Configuración de variables de entorno para guardar credenciales
import express from 'express';
import router from './routes/index.js'; // Importamos el router
import { corsMiddleware } from './utils/utils.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json()); // Middleware para parsear el body a JSON
app.use(corsMiddleware()); // Middleware para habilitar CORS
app.use('/api', router);

// Si es exito agregarle al response la propiedad success

// Levantamos el servidor
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
