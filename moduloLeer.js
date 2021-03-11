module.exports = {
    leer : function(app,fs) {
        var arrego =[]
        var guardados
        
        async function leer(){
            
            try{
                await fs.promises.readFile(`./productos.txt`,`utf-8`).then(contenido =>{
                   guardados =  contenido
                })
            }
            catch{
                console.log([])
                
            }
              
        
        }
        leer().then(()=>{
            
            if(guardados) arrego = JSON.parse(guardados)
           
            app.get('/api/productos/listar', function (req, res) {
                if( !arrego.length ){
                    return res.status(400).json({"error": "No hay productos cargados"});
                }
                res.status(200).json(arrego)
              })
        
              app.get('/api/productos/listar/:id', function (req, res) {
                let id = parseInt(req.params.id)
        
                if( (0 >= id) || (arrego.length < id)){
                    return res.status(400).json({"error": "Producto no encontrado"});
                }
                res.status(200).json(arrego[id])
              })
          
        
        })
    }

}