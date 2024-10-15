require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cron = require('./util/cronjob');

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

cron.start();

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