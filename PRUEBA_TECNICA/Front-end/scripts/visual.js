function renderizarTablaFiltrable(array_columns) {
  let visualizacion = document.getElementById("visualizacion");

  if (!visualizacion) {
    visualizacion = document.createElement("div");
    visualizacion.id = "visualizacion";
    document.body.appendChild(visualizacion);
  }

  let inputBusqueda = document.getElementById("inputBusqueda");

  if (!inputBusqueda) {
    inputBusqueda = document.createElement("input");
    inputBusqueda.id = "inputBusqueda";
    inputBusqueda.type = "text";
    inputBusqueda.placeholder = "Buscar...";
    inputBusqueda.style.margin = "1rem 0";
    inputBusqueda.style.padding = "0.5rem";
    inputBusqueda.style.border = "1px solid #ccc";
    inputBusqueda.style.borderRadius = "5px";
    document.body.insertBefore(inputBusqueda, visualizacion);
  }

  const dataLocal = localStorage.getItem("data");

  if (!dataLocal) {
    visualizacion.textContent = "No hay datos disponibles en localStorage.";
    return;
  }

  const data_array = JSON.parse(dataLocal);

  // Función para construir la tabla
  function construirTabla(datos) {
    visualizacion.innerHTML = "";

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    array_columns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col;
      th.style.border = "1px solid #000";
      th.style.padding = "8px";
      th.style.backgroundColor = "#f2f2f2";
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    datos.forEach(registro => {
      const row = document.createElement("tr");

      array_columns.forEach(col => {
        const td = document.createElement("td");
        td.textContent = registro[col] || "";
        td.style.border = "1px solid #ccc";
        td.style.padding = "8px";
        row.appendChild(td);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    visualizacion.appendChild(table);
  }

  inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();

    const filtrado = data_array.filter(registro =>
      array_columns.some(col =>
        (registro[col] || "").toString().toLowerCase().includes(texto)
      )
    );

    construirTabla(filtrado);
  });

  construirTabla(data_array);
}

// 👉 Llama la función así:
const columnas = ["IDENTIFICACION", "NOMBRE", "CORREO", "FECHA_NACIMIENTO", "CARGO"];
renderizarTablaFiltrable(columnas);

  // Crear botón de orden por NOMBRE (Z-A)
  const btnOrdenarNombre = document.createElement("button");
  btnOrdenarNombre.textContent = "Ordenar por NOMBRE (Z → A)";
  btnOrdenarNombre.style.margin = "0 0 1rem 0.5rem";
  btnOrdenarNombre.style.padding = "0.5rem";
  btnOrdenarNombre.style.border = "1px solid #000";
  btnOrdenarNombre.style.borderRadius = "4px";
  btnOrdenarNombre.style.cursor = "pointer";

  // Insertar el botón antes de la tabla
  inputBusqueda.insertAdjacentElement("afterend", btnOrdenarNombre);

  btnOrdenarNombre.addEventListener("click", () => {
    const ordenado = [...data_array].sort((a, b) => {
      const nombreA = (a["NOMBRE"] || "").toLowerCase();
      const nombreB = (b["NOMBRE"] || "").toLowerCase();
      return nombreB.localeCompare(nombreA); // Orden descendente
    });

    construirTabla(ordenado);
  });   
