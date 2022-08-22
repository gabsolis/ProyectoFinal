const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemacliente = new eschema({
    codigo: String,
    nombre: String,
    montopagado: String,
    detalle: String,
    restaurante: String,
    fecha: String,
    reservacion: String,
    barra: String,
})

const ModeloCliente = mongoose.model('clientes', eschemacliente)
module.exports = router


//Guardar usuario
router.post('/agregarcliente', (req, res) =>{
    const nuevocliente = new ModeloCliente({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        montopagado: req.body.montopagado,
        detalle: req.body.detalle,
        restaurante: req.body.restaurante,
        fecha: req.body.fecha,
        reservacion: req.body.reservacion,
        barra: req.body.barra
    })
    nuevocliente.save(function(err){
        if(!err){
            res.send('Cliente agregado correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenercliente', (req, res) =>{
    ModeloCliente.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenercliente', (req, res) =>{
    ModeloCliente.find({codigo:req.body.codigo}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizacliente', (req, res) =>{
  ModeloCliente.findOneAndUpdate({codigo:req.body.codigo}, {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    montopagado: req.body.montopagado,
    detalle: req.body.detalle,
    restaurante: req.body.restaurante,
    fecha: req.body.fecha,
    reservacion: req.body.reservacion,
    barra: req.body.barra
  }, (err) =>{
    if(!err){
        res.send('Cliente actualizado correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarcliente', (req, res) =>{
    ModeloCliente.findOneAndDelete({codigo:req.body.codigo}, (err) => {
        if(!err){
            res.send('Cliente eliminado correctamente')
        } else{
            res.send(err)
        }
    })
  })