const fs = require('fs')
const express = require('express')
var moduloLeer= require('./moduloLeer');
var moduloGuardar= require('./moduloGuardar');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


moduloLeer.leer(app,fs)

app.post('/api/productos/guardar/:nombre/:precio/:url', function (req, res) {
    moduloGuardar.guardar(req.params.nombre,req.params.precio,req.params.url,fs)
    res.status(200).json("guardado")
  })


const port = 8080 
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  server.on("error",error =>console.log(`error en servidor ${error}`))