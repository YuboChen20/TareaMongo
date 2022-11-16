let atareas= document.getElementById("ATarea")
let tareas =[]
let ul= document.getElementById("listT")
let bborrar= document.getElementById("BBorrar")
let ssubir= document.getElementById("SSubir")
let bbajar= document.getElementById("BBajar")
function cargar(){
    if (localStorage.getItem("Tareas")){
        tareas=JSON.parse(localStorage.getItem("Tareas"))
        crear_l(tareas)
        }

    function crear_l(tareas){
        tareas.forEach(tar=> {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(tar["tarea"]));
            ul.appendChild(li)
        })

    }
    function anadir_lc(res){
        res.forEach(tar=> {
            tareas.push(tar)
            localStorage.setItem("Tareas" ,JSON.stringify(tareas))
        })

    }

    atareas.addEventListener("keydown", e => {
        var campo=e.target;

        var move = e.key;
        if(move=="Enter"){
            let tarea ={tarea : campo.value}
            tareas.push(tarea)
            e.preventDefault();
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(campo.value));
            ul.appendChild(li)
            localStorage.setItem("Tareas" ,JSON.stringify(tareas))
            campo.value="";
        }
    })
    bborrar.addEventListener("click", e =>{
        tareas = [];
        localStorage.clear()
        ul.innerHTML=""
    })
    ssubir.addEventListener("click", e =>{

        fetch('http://localhost:3000',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: localStorage.getItem("Tareas")
            }).then(r => r.text())
    })
    bbajar.addEventListener("click", async e =>{
        localStorage.clear()
        ul.innerHTML=""
        tareas = [];
        var res = await fetch('http://localhost:3000/json').then(r => r.json())
        crear_l(res)
        anadir_lc(res)


    })


}

window.onload=cargar()