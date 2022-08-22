const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemabuffet = new eschema({
    codigo: String,
    nombre: String,
    precio: String,
    tipocomida: String,
    unidadmedida: String
})

const ModeloBuffet = mongoose.model('buffets', eschemabuffet)
module.exports = router


//Guardar buffet
router.post('/agregarbuffet', (req, res) =>{
    const nuevobuffet = new ModeloBuffet({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        precio: req.body.precio,
        tipocomida: req.body.tipocomida,
        unidadmedida: req.body.unidadmedida,
    })
    nuevobuffet.save(function(err){
        if(!err){
            res.send('buffet agregada correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenerbuffet', (req, res) =>{
    ModeloBuffet.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenerbuffet', (req, res) =>{
    ModeloBuffet.find({codigo:req.body.codigo}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizabuffet', (req, res) =>{
  ModeloBuffet.findOneAndUpdate({codigo:req.body.codigo}, {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    precio: req.body.precio,
    tipocomida: req.body.tipocomida,
    unidadmedida: req.body.unidadmedida
  }, (err) =>{
    if(!err){
        res.send('buffet actualizada correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarbuffet', (req, res) =>{
    ModeloBuffet.findOneAndDelete({codigo:req.body.codigo}, (err) => {
        if(!err){
            res.send('buffet actualizada correctamente')
        } else{
            res.send(err)
        }
    })
  })