



const express = require('express');
require('dotenv').config()
const { dbConnection } = require('./database/config')
const cors = require('cors');

console.log(process.env)

// Crear el servidor de express


const app = express();

// Database
dbConnection()

// App cors
app.use(cors())
// Directorio público
app.use(express.static('public'))

// Lectura del body 
app.use(express.json());


// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'))


// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})