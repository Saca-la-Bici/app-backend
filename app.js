// Para usar express en vez de http
const express = require('express');

// Inicia la app usuando a express
const app = express();
const port = 5000;

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

// Middleware para verificar si la sesión está activa
function checkSession(req, res, next) {
    if (!req.session.username) {
        return res.status(401).json({
            message: 'No hay sesión activa'
        });
    }
    next();
}

app.get('/', (request, response) => {
    request.send('¡Bienvenido a Saca la Bici!');
});

// Para error 404
app.use((request, response, next) => {
    response.status(404).json({
        message: 'No se encuentra el endpoint o ruta que estas buscando'
    });
});

// Para que el servidor este activo
app.listen(port, () => {
    console.log(`Se corre en el puerto ${port}`);
});
