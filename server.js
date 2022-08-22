const express = require('express')
const app = express()

//Conexion mongo

const archivoBD = require('./conexion')

// Importacion de las rutas y modelos
const rutausuario = require('./rutas/usuario')
const rutamesa = require('./rutas/mesa')
const rutabebida = require('./rutas/bebida')
const rutabitacora = require('./rutas/bitacora')
const rutacaja = require('./rutas/caja')
const rutacliente = require('./rutas/cliente')
const rutabuffet = require('./rutas/buffet')
const rutausuarioadmin = require('./rutas/usuarioadmin')


//importacion body parser

const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:'true'}))


app.use('/api/usuario', rutausuario)
app.use('/api/mesa', rutamesa)
app.use('/api/bebida', rutabebida)
app.use('/api/bitacora', rutabitacora)
app.use('/api/caja', rutacaja)
app.use('/api/cliente', rutacliente)
app.use('/api/buffet', rutabuffet)
app.use('/api/usuarioadmin', rutausuarioadmin)


app.get('/', (req, res)=> {
    res.end('Servidor node js')
})


//Configuracion server

app.listen(5000, function(){
    console.log('El servidor esta corriendo')
})