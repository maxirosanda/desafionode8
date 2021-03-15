module.exports = {
    guardar : function(nombre,precio,url,fs) {
        var arrego =[]
        var guardados
        async function leer(){
            
            try{
                await fs.promises.readFile(`./productos.js`,`utf-8`).then(contenido =>{
                   guardados =  contenido
                })
            }
            catch{
                console.log([])
                
            }
              
    
        }
    
        leer().then(()=>{
            if(guardados) arrego = JSON.parse(guardados)
             
            var objeto =  {
                id :arrego.length,
                title: nombre,
                price: precio,
                thumbnail: url
            }
            arrego.push(objeto)
            async function agregar(){
                
                try{
                    await fs.promises.writeFile(`./productos.js`,`${JSON.stringify(arrego, null,'\t') }\n`)
                }
                catch{
                    console.log('error')
                    
                }
            }
            agregar(this.archivo)
            
        })
    }

}