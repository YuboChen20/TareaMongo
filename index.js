const express = require('express')
const app = express()
const fs=require("fs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/test', ['task'])


app.get("/json", (req,res)=>{
    var datos=[]
    db.task.find({}).toArray(function(err, result) {
        if (err){console.log("Error al bajar")}
        else {
        result.forEach(t=>{
            datos.push({tarea : t.Task})
        })
        console.log("Se ha bajado las tareas");
        console.log(datos)
        res.json(datos)
       }
    })
    
    

})




app.post("/",(req,res)=>{
    var tareas = req.body
    console.log("Tareas subidas:");
    db.task.remove({})
    if (tareas.length>0)
        tareas.forEach(task => {
            db.task.insertOne({"Task":task.tarea},(err,doc)=>{
                if(err){ 
                }else{
                    console.log(task);
                    
                }

         
    })
})})

app.listen(3000,function(){console.log("Servidor lanzado en el puerto 3000")})


