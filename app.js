require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cronKmMes = require('./util/cronjobKmMes');
const { 
  borrarAnunciosCaducados, 
  actualizarEstadoActsCron } = require('./util/cronjob');

  /**
 * Servidor Express para la aplicación "Saca la Bici".
 * 
 * Este archivo configura y ejecuta el servidor web, incluyendo la conexión a la 
 * base de datos de MongoDB y la inicialización de cron jobs. Los componentes 
 * principales incluyen:
 * 
 * - Configuración de middleware: Se utiliza `body-parser` para manejar las 
 *   solicitudes HTTP, y `compression` para optimizar las respuestas.
 * - Rutas: Se importan y registran rutas específicas para diferentes módulos 
 *   de la aplicación.
 * - Manejo de autenticación: Se implementan funciones de verificación de 
 *   tokens y permisos de usuario para proteger ciertos endpoints.
 * - Manejo de errores: Se implementa un middleware para manejar rutas no 
 *   encontradas (404).
 * - Configuración de cron jobs: Se inician cron jobs para actualizar datos 
 *   relacionados con kilómetros recorridos por mes y para borrar anuncios caducados.
 * 
 * La aplicación escucha en un puerto especificado en las variables de entorno 
 * (por defecto, el puerto 8080) y se conecta a la base de datos MongoDB usando 
 * la URI especificada en las variables de entorno.
 */

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Iniciar los cron jobs
cronKmMes.start();
borrarAnunciosCaducados.start();
actualizarEstadoActsCron.start();

const compression = require("compression");
app.use(compression());

// Conectar a la base de datos usando variables de entorno
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB en AWS EC2");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

// Importar el archivo index de cada módulo
const actividadesRoutes = require("./modules/actividades/routes/actividadesIndex.routes");
const anunciosRoutes = require("./modules/anuncios/routes/anunciosIndex.routes");
const estadisticasRoutes = require("./modules/estadisticas/routes/estadisticasIndex.routes");
const foroRoutes = require("./modules/foro/routes/foroIndex.routes");
const mapaRoutes = require("./modules/mapa/routes/mapaIndex.routes");
const perfilRoutes = require("./modules/perfil/routes/perfilIndex.routes");
const preguntasRoutes = require("./modules/preguntasFrecuentes/routes/preguntasIndex.routes");
const reporteRoutes = require("./modules/reporte/routes/reporteIndex.routes");
const rodadasRoutes = require("./modules/rodadas/routes/rodadasIndex.routes");
const sessionRoutes = require("./modules/session/routes/sessionIndex.routes");
const policiesRoutes = require("./modules/policies/routes/policiesIndex.routes");

app.use("/actividades", actividadesRoutes);
app.use("/anuncios", anunciosRoutes);
app.use("/estadisticas", estadisticasRoutes);
app.use("/foro", foroRoutes);
app.use("/mapa", mapaRoutes);
app.use("/perfil", perfilRoutes);
app.use("/preguntasFrecuentes", preguntasRoutes);
app.use("/reporte", reporteRoutes);
app.use("/rodadas", rodadasRoutes);
app.use("/session", sessionRoutes);
app.use("/politicasAplicacion", policiesRoutes);

const verifyToken = require("./util/verifyUserToken");
const verifyUserPermissions = require("./util/verifyUserPermissions");

app.get("/", verifyToken, (request, response) => {
  response.status(200).json({
    message: "¡Bienvenido a Saca la Bici!",
  });
});

app.get(
  "/getPermissions",
  verifyToken,
  verifyUserPermissions,
  (request, response) => {
    response.status(200).json({
      permisos: request.permisos,
    });
  }
);

app.use((request, response) => {
  response.status(404).json({
    message: "No se encuentra el endpoint o ruta que estas buscando",
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});