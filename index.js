const express = require('express')
const app = express()
const fs=require("fs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


/*app.get("/", (req,res)=>{
    res.send("hi M")
})
*/
app.get("/json", (req,res)=>{
    fs.readFile("public/data.txt", function(er,datos){
        if(er){
        }
        console.log("Se ha bajado las tareas");

        console.log(JSON.parse(datos))
        res.json(JSON.parse(datos) )
    })

})




app.post("/",(req,res)=>{
    var text = JSON.stringify(req.body)
    fs.writeFile("public/data.txt", text, function(er){
        if(er){
        }
        console.log("Se han subido las tareas");
        console.log(JSON.parse(text));
    })

})
app.listen(3000,function(){console.log("Servidor lanzado en el puerto 3000")})


