const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema


const eschemausuario = new eschema({
    nombre: String,
    email: String,
    rol: String,
    idusuario: String,
    puesto: String,
    restaurante: String,
    nacionalidad: String
})

const ModeloUsuario = mongoose.model('usuarios', eschemausuario)
module.exports = router


//Guardar usuario
router.post('/agregarusuario', (req, res) =>{
    const nuevousuario = new ModeloUsuario({
        nombre: req.body.nombre,
        email: req.body.email,
        rol: req.body.rol,
        idusuario: req.body.idusuario,
        puesto: req.body.puesto,
        restaurante: req.body.restaurante,
        nacionalidad: req.body.nacionalidad
    })
    nuevousuario.save(function(err){
        if(!err){
            res.send('Usuario agregado correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenerusuarios', (req, res) =>{
    ModeloUsuario.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenerdatausuario', (req, res) =>{
    ModeloUsuario.find({idusuario:req.body.idusuario}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizausuario', (req, res) =>{
  ModeloUsuario.findOneAndUpdate({idusuario:req.body.idusuario}, {
    nombre: req.body.nombre,
    email: req.body.email,
    rol: req.body.rol,
    puesto: req.body.puesto,
    restaurante: req.body.restaurante,
    nacionalidad: req.body.nacionalidad
  }, (err) =>{
    if(!err){
        res.send('Usuario actualizado correctamente')
    } else{
        res.send(err)
    }
  })
})

//borrar usuario
router.post('/borrarusuario', (req, res) =>{
    ModeloUsuario.findOneAndDelete({idusuario:req.body.idusuario}, (err) => {
        if(!err){
            res.send('Usuario eliminado correctamente')
        } else{
            res.send(err)
        }
    })
  })