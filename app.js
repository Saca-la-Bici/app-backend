// Para usar express en vez de http
const express = require('express');
const mongoose = require('mongoose');

// Inicia la app usuando a express
const app = express();
const port = 7070;

// Manipular facil los datos de las peticiones
const bodyParser = require('body-parser');

// Configura bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// USAR JWT (JSON Web Tokens) para autenticar las solicitudes

const compression = require('compression');

app.use(compression());

// Conectar a la base de datos local de MongoDB
mongoose.connect('mongodb://localhost:27017/Saca_la_Bici')
.then(() => {
    console.log('Conectado a la base de datos local de MongoDB');
}).catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});

// Importar el archivo index de cada módulo
const actividadesRoutes = require('./modules/actividades/routes/actividadesIndex.routes');
const anunciosRoutes = require('./modules/anuncios/routes/anunciosIndex.routes');
const ayudaRoutes = require('./modules/ayuda/routes/ayudaIndex.routes');
const estadisticasRoutes = require('./modules/estadisticas/routes/estadisticasIndex.routes');
const foroRoutes = require('./modules/foro/routes/foroIndex.routes');
const mapaRoutes = require('./modules/mapa/routes/mapaIndex.routes');
const perfilRoutes = require('./modules/perfil/routes/perfilIndex.routes');
const preguntasRoutes = require('./modules/preguntasFrecuentes/routes/preguntasIndex.routes');
const rentaRoutes = require('./modules/renta/routes/rentaIndex.routes');
const reporteRoutes = require('./modules/reporte/routes/reporteIndex.routes');
const rodadasRoutes = require('./modules/rodadas/routes/rodadasIndex.routes');
const sessionRoutes = require('./modules/session/routes/sessionIndex.routes');

// Usar las rutas de los módulos
app.use('/actividades', actividadesRoutes);
app.use('/anuncios', anunciosRoutes);
app.use('/ayuda', ayudaRoutes);
app.use('/estadisticas', estadisticasRoutes);
app.use('/foro', foroRoutes);
app.use('/mapa', mapaRoutes);
app.use('/perfil', perfilRoutes);
app.use('/preguntasFrecuentes', preguntasRoutes);
app.use('/renta', rentaRoutes);
app.use('/reporte', reporteRoutes);
app.use('/rodadas', rodadasRoutes);
app.use('/session', sessionRoutes);

// Middleware para verificar si la sesión está activa
// function checkSession(req, res, next) {
//     if (!req.session.username) {
//         return res.status(401).json({
//             message: 'No hay sesión activa'
//         });
//     }
//     next();
// }

const verifyToken = require('./util/verifyUserToken');

app.get('/', verifyToken, (request, response) => {
    response.status(200).json({
        message: '¡Bienvenido a Saca la Bici!'
    });
    console.log(request.userUID)
});

// Para error 404
app.use((request, response) => {
    response.status(404).json({
        message: 'No se encuentra el endpoint o ruta que estas buscando'
    });
});

// Para que el servidor este activo
app.listen(port);
