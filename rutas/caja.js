const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemacaja = new eschema({
    codigo: String,
    apertura: String,
    fecha: String,
    descripcion: String,
    cierre: String,
    restaurante: String
})

const ModeloCaja = mongoose.model('cajas', eschemacaja)
module.exports = router


//Guardar caja
router.post('/agregarcaja', (req, res) =>{
    const nuevacaja = new ModeloCaja({
        apertura: req.body.apertura,
        codigo: req.body.codigo,
        fecha: req.body.fecha,
        descripcion: req.body.descripcion,
        cierre: req.body.cierre,
        restaurante: req.body.restaurante
    })
    nuevacaja.save(function(err){
        if(!err){
            res.send('Caja agregada correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenercaja', (req, res) =>{
    ModeloCaja.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenercaja', (req, res) =>{
    ModeloCaja.find({codigo:req.body.codigo}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizacaja', (req, res) =>{
  ModeloCaja.findOneAndUpdate({codigo:req.body.codigo}, {
    apertura: req.body.apertura,
    codigo: req.body.codigo,
    fecha: req.body.fecha,
    descripcion: req.body.descripcion,
    cierre: req.body.cierre,
    restaurante: req.body.restaurante
  }, (err) =>{
    if(!err){
        res.send('caja actualizada correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarcaja', (req, res) =>{
    ModeloCaja.findOneAndDelete({codigo:req.body.codigo}, (err) => {
        if(!err){
            res.send('Caja actualizada correctamente')
        } else{
            res.send(err)
        }
    })
  })