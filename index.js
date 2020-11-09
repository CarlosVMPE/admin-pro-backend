require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Cors
// ejecuta siempre esto cada vez que pasen por aquí
app.use(cors())

// Lectura y parseo del Body
app.use(express.json());

// Base de datos
dbConnection();

// console.log(process.env);

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo ' + process.env.PORT);
});