const form = document.getElementById("form")

form.addEventListener("submit", function(event){
    event.preventDefault()
    const inputs = event.target
    console.log(inputs)
    const exists = JSON.parse(localStorage.getItem("data"))
    console.log(exists)
    const data_now = Object.fromEntries(new FormData(inputs))
    data_now.FECHA_CREACION = new Date(Date.now()).toISOString()
    exists.push(data_now)
    localStorage.setItem("data", JSON.stringify(exists))
    window.alert("Se han registrado y almacenado los datos diligenciados!")
})