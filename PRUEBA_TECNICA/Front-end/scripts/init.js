const rute = "../data/data.json";

// Solo ejecuta fetch si no existe ya "data" en localStorage
if (!localStorage.getItem("data")) {
  fetch(rute)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("data", JSON.stringify(data));
      console.log("✅ Datos cargados por primera vez");
    })
    .catch(error => {
      console.error("❌ Error al cargar data.json:", error);
    });
} else {
  console.log("🔁 Los datos ya estaban en localStorage. No se volvió a cargar.");
}
