const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemabitacora = new eschema({
    codigo: String,
    usuario: String,
    fecha: String,
    descripcion: String
})

const ModeloBitacora = mongoose.model('bitacoras', eschemabitacora)
module.exports = router


//Guardar usuario
router.post('/agregarbitacora', (req, res) =>{
    const nuevabitacora = new ModeloBitacora({
        usuario: req.body.usuario,
        codigo: req.body.codigo,
        fecha: req.body.fecha,
        descripcion: req.body.descripcion
    })
    nuevabitacora.save(function(err){
        if(!err){
            res.send('bitacora agregada correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenerbitacora', (req, res) =>{
    ModeloBitacora.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenerbitacora', (req, res) =>{
    ModeloBitacora.find({codigo:req.body.codigo}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizabitacora', (req, res) =>{
  ModeloBitacora.findOneAndUpdate({codigo:req.body.codigo}, {
    usuario: req.body.usuario,
    codigo: req.body.codigo,
    fecha: req.body.fecha,
    descripcion: req.body.descripcion
  }, (err) =>{
    if(!err){
        res.send('bitacora actualizada correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarbitacora', (req, res) =>{
    ModeloBitacora.findOneAndDelete({codigo:req.body.codigo}, (err) => {
        if(!err){
            res.send('Bitacora actualizada correctamente')
        } else{
            res.send(err)
        }
    })
  })