require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const compression = require("compression");
app.use(compression());

// Conectar a la base de datos usando variables de entorno
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB en AWS EC2");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

// Importar el archivo index de cada módulo
const actividadesRoutes = require("./modules/actividades/routes/actividadesIndex.routes");
const anunciosRoutes = require("./modules/anuncios/routes/anunciosIndex.routes");
const ayudaRoutes = require("./modules/ayuda/routes/ayudaIndex.routes");
const estadisticasRoutes = require("./modules/estadisticas/routes/estadisticasIndex.routes");
const foroRoutes = require("./modules/foro/routes/foroIndex.routes");
const mapaRoutes = require("./modules/mapa/routes/mapaIndex.routes");
const perfilRoutes = require("./modules/perfil/routes/perfilIndex.routes");
const preguntasRoutes = require("./modules/preguntasFrecuentes/routes/preguntasIndex.routes");
const rentaRoutes = require("./modules/renta/routes/rentaIndex.routes");
const reporteRoutes = require("./modules/reporte/routes/reporteIndex.routes");
const rodadasRoutes = require("./modules/rodadas/routes/rodadasIndex.routes");
const sessionRoutes = require("./modules/session/routes/sessionIndex.routes");

app.use("/actividades", actividadesRoutes);
app.use("/anuncios", anunciosRoutes);
app.use("/ayuda", ayudaRoutes);
app.use("/estadisticas", estadisticasRoutes);
app.use("/foro", foroRoutes);
app.use("/mapa", mapaRoutes);
app.use("/perfil", perfilRoutes);
app.use("/preguntasFrecuentes", preguntasRoutes);
app.use("/renta", rentaRoutes);
app.use("/reporte", reporteRoutes);
app.use("/rodadas", rodadasRoutes);
app.use("/session", sessionRoutes);

const verifyToken = require("./util/verifyUserToken");

app.get("/", verifyToken, (request, response) => {
  response.status(200).json({
    message: "¡Bienvenido a Saca la Bici!",
  });
  console.log(request.userUID);
});

app.use((request, response) => {
  response.status(404).json({
    message: "No se encuentra el endpoint o ruta que estas buscando",
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});