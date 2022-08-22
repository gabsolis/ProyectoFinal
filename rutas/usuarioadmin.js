const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const eschema = mongoose.Schema
const bcrypt = require('bcryptjs')

const eschemausuarioadmin = new eschema({
    nombre: String,
    apellidos: String,
    telefono: String,
    idusuarioadmin: String,
    telefono: String,
    adminsistema: String,
    adminseguridad: String,
    adminrestaurante: String,
    admincuenta: String,
    username: String,
    contrasena: String
})

const ModeloUsuarioAdmin = mongoose.model('usuariosadmin', eschemausuarioadmin)
module.exports = router
//encriptacion

eschemausuarioadmin.pre('save', function(next){
    const usuario = this;
    if (!usuario.isModified('contrasena')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err){
            next(err);
        }
        bcrypt.hash(usuario.contrasena, salt, null, (err, hash)=>{
            if(err){
                next(err);
            }
            usuario.contrasena = hash;
            next();
        })
    })
})


//Guardar usuario
router.post('/agregarusuarioadmin', (req, res) =>{
    const nuevousuarioadmin = new ModeloUsuarioAdmin({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        idusuarioadmin: req.body.idusuarioadmin,
        telefono: req.body.telefono,
        adminsistema: req.body.adminsistema,
        adminseguridad: req.body.adminseguridad,
        adminrestaurante: req.body.adminrestaurante,
        admincuenta: req.body.admincuenta,
        username: req.body.username,
        contrasena: req.body.contrasena
    })
    nuevousuarioadmin.save(function(err){
        if(!err){
            res.send('Usuario agregado correctamente')
        } else{
            res.send(err)
        }
    })
})

//Obtener lista de usuarios
router.get('/obtenerusuariosadmin', (req, res) =>{
    ModeloUsuarioAdmin.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})

//Obtener data de usuarios
router.post('/obtenerdatausuarioadmin', (req, res) =>{
    ModeloUsuarioAdmin.find({idusuario:req.body.idusuario}, function(docs, err){
        if(!err){
            res.send(docs)
        } else{
            res.send(err)
        }
    })
})


//Actualiza usuario
router.post('/actualizausuarioadmin', (req, res) =>{
  ModeloUsuarioAdmin.findOneAndUpdate({idusuario:req.body.idusuario}, {
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
router.post('/borrarusuarioadmin', (req, res) =>{
    ModeloUsuarioAdmin.findOneAndDelete({idusuario:req.body.idusuario}, (err) => {
        if(!err){
            res.send('Usuario eliminado correctamente')
        } else{
            res.send(err)
        }
    })
  })