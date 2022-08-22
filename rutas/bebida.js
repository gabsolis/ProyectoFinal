const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemabebida = new eschema({
    idbebida: String,
    codigo: String,
    nombre: String,
    tipobebida: String,
    precio: String,
    descripcion: String,
    ingredientes: String,
    restaurante: String,
    marca: String,
    nacionalidad: String,
    preciounitario: String,
    preciobotella: String,
    aniocosecha: String,
})

const ModeloBebida = mongoose.model('bebidas', eschemabebida)
module.exports = router


//Guardar usuario
router.post('/agregarbebida', (req, res) =>{
    const nuevabebida = new ModeloBebida({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        tipobebida: req.body.tipobebida,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        ingredientes: req.body.ingredientes,
        restaurante: req.body.restaurante,
        marca: req.body.marca,
        nacionalidad: req.body.nacionalidad,
        preciounitario: req.body.preciounitario,
        preciobotella: req.body.preciobotella,
        aniocosecha: req.body.aniocosecha,
        idbebida: req.body.idbebida

    })
    nuevabebida.save(function(err){
        if(!err){
            res.send('bebida agregada correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenerbebida', (req, res) =>{
    ModeloBebida.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenerbebida', (req, res) =>{
    ModeloBebida.find({idbebida: req.body.idbebida}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizabebida', (req, res) =>{
  ModeloBebida.findOneAndUpdate({idbebida:req.body.idbebida}, {
    nombre: req.body.nombre,
    codigo: req.body.codigo,
    tipobebida: req.body.tipobebida,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    ingredientes: req.body.ingredientes,
    restaurante: req.body.restaurante,
    marca: req.body.marca,
    nacionalidad: req.body.nacionalidad,
    preciounitario: req.body.preciounitario,
    preciobotella: req.body.preciobotella,
    aniocosecha: req.body.aniocosecha,
    idbebida: req.body.idbebida
  }, (err) =>{
    if(!err){
        res.send('bebida actualizada correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarbebida', (req, res) =>{
    ModeloBebida.findOneAndDelete({idbebida:req.body.idbebida}, (err) => {
        if(!err){
            res.send('Bebida eliminada correctamente')
        } else{
            res.send(err)
        }
    })
  })