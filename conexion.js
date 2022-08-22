const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/restaurante');

const objetobd = mongoose.connection

objetobd.on ('connected', ()=> {console.log('Conexion correcta a mongo')})
objetobd.on ('error', ()=> {console.log(' ERROR Conexion correcta a mongo')})

module.exports = mongoose