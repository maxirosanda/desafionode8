const fs = require('fs')
const express = require('express')
var moduloLeer= require('./moduloLeer');
var moduloGuardar= require('./moduloGuardar');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
var arreglo=[]

moduloLeer.leer(fs).then(guardados=>{

  if(guardados) arreglo = JSON.parse(guardados)

//-----------------------Lista------------------------------------------------
  app.get('/api/listar', function (req, res) {
    if( !arreglo.length ){
        return res.status(400).json({"error": "No hay productos cargados"});
    }
    res.status(200).json(arreglo)
  })
  
//-----------------------Producto individual------------------------------------

  app.get('/api/listar/:id', function (req, res) {
    let id = parseInt(req.params.id)
  
    if( (0 > id) || (arreglo.length - 1 < id)){
        return res.status(400).json({"error": "Producto no encontrado"});
    }
    res.status(200).json(arreglo[id])
  })


})


//------------------------------Guardar---------------------------------------


app.post('/api/productos/', function (req, res) {
    moduloGuardar.guardar(req.body.nombre,req.body.precio,req.body.url,fs)
    res.status(200).json("guardado")
  })

//--------------------------------------------------------------------
const port = 8080 
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  server.on("error",error =>console.log(`error en servidor ${error}`))