module.exports = {
    borrar : function(id,fs) {
        var arreglo =[]
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
            if(guardados) arreglo = JSON.parse(guardados)
            arreglo.forEach((element,index) =>{
                if (element.id == id){
                    arreglo.splice(index, 1);
                    
                }    

            })
           
            async function agregar(){
                
                try{
                    await fs.promises.writeFile(`./productos.js`,`${JSON.stringify(arreglo, null,'\t') }\n`)
                }
                catch{
                    console.log('error')
                    
                }
            }
            agregar(this.archivo)
           
        })
    }

}