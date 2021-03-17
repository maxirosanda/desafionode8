const fs = require('fs')
const express = require('express')
var moduloLeer= require('./moduloLeer');
var moduloGuardar= require('./moduloGuardar');
var moduloActualizar =require('./moduloActualizar')
var moduloBorrar = require('./moduloBorrar')
const app = express()
var router = express.Router()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var arreglo=[]

moduloLeer.leer(fs).then(guardados=>{

  if(guardados) arreglo = JSON.parse(guardados)
//-----------------------Lista------------------------------------------------
  router.get('/listar', function (req, res) {
    if( !arreglo.length ){
        return res.status(400).json({"error": "No hay productos cargados"});
    }
    res.status(200).json(arreglo)
  })
  
//-----------------------Producto individual------------------------------------

 router.get('/listar/:id', function (req, res) {
    let id = parseInt(req.params.id)
  
    if( (0 > id) || (arreglo.length - 1 < id)){
        return res.status(400).json({"error": "Producto no encontrado"});
    }
    res.status(200).json(arreglo[id])
  })


})


//------------------------------Guardar---------------------------------------


router.post('/productos/', function (req, res) {
    moduloGuardar.guardar(req.body.nombre,req.body.precio,req.body.url,fs)
    res.status(200).json("guardado")
  })

//------------------------------Actualizar---------------------------------------


router.put('/productos/:id', function (req, res) {
  moduloActualizar.actualizar(req.body.nombre,req.body.precio,req.body.url,parseInt(req.params.id),fs)
  res.status(200).json("actualizado")
})

//-------------------------------Borrar-------------------------------------
router.delete('/productos/borrar/:id', function (req, res) {
 moduloBorrar.borrar(parseInt(req.params.id),fs)

    res.status(200).json("Borrado")  
})
//---------------------------------------------------------------------------
app.use('/api',router)
app.use(express.static('public'));
const port = 8080 
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  server.on("error",error =>console.log(`error en servidor ${error}`))