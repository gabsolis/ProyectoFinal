const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemamesa = new eschema({
    codigo: String,
    nombre: String,
    numeromesa: String,
    sillas: String,
    restaurante: String
})

const ModeloMesa = mongoose.model('mesas', eschemamesa)
module.exports = router


//Guardar usuario
router.post('/agregarmesa', (req, res) =>{
    const nuevamesa = new ModeloMesa({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        numeromesa: req.body.numeromesa,
        sillas: req.body.sillas,
        restaurante: req.body.restaurante
    })
    nuevamesa.save(function(err){
        if(!err){
            res.send('Mesa agregada correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenermesa', (req, res) =>{
    ModeloMesa.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenerdatamesa', (req, res) =>{
    ModeloMesa.find({codigo:req.body.codigo}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizamesa', (req, res) =>{
  ModeloMesa.findOneAndUpdate({codigo:req.body.codigo}, {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    numeromesa: req.body.numeromesa,
    sillas: req.body.sillas,
    restaurante: req.body.restaurante
  }, (err) =>{
    if(!err){
        res.send('Mesa actualizada correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarmesa', (req, res) =>{
    ModeloMesa.findOneAndDelete({codigo:req.body.codigo}, (err) => {
        if(!err){
            res.send('Mesa actualizada correctamente')
        } else{
            res.send(err)
        }
    })
  })