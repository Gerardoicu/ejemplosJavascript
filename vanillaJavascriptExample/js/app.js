let arrayActividades = [];
let formulario = document.querySelector("#formulario");
let actividades = document.querySelector("#actividades");
const CrearItem = actividad => {
  let item = {
    actividad: actividad,
    estado: false
  };
  arrayActividades.push(item);
  return item;
};
const PintarDB = () => {
  actividades.innerHTML = "";
  arrayActividades = JSON.parse(localStorage.getItem("item"));
  if (arrayActividades === null) {
    arrayActividades = [];
  } else {
    arrayActividades.forEach(element => {
      if (element.estado) {
        actividades.innerHTML += `<div class="alert alert-success float-center mt-4 offset-3 col-6" role="alert"><b>${
          element.actividad
        }</b><i class="material-icons">accessibility_new</i><span class="float-right">${
          element.estado
        }<i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
      } else {
        actividades.innerHTML += `<div class="alert alert-danger float-center mt-4 offset-3 col-6" role="alert"><b>${
          element.actividad
        }</b><i class="material-icons">accessibility_new</i><span class="float-right">${
          element.estado
        }<i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`;
      }
    });
  }
};
const GuardarDB = () => {
  localStorage.setItem("item", JSON.stringify(arrayActividades));
  PintarDB();
};
const EditarDB = actividad => {
  let indexArray = arrayActividades.findIndex(
    element => element.actividad === actividad
  );
  arrayActividades[indexArray].estado = !arrayActividades[indexArray].estado;
  GuardarDB();
};
const EliminarDB = actividad => {
  let indexArray;
  arrayActividades.forEach((element, index) => {
    if (element.actividad === actividad) {
      indexArray = index;
    }
  });
  arrayActividades.splice(indexArray, 1);
  console.log(arrayActividades);
  GuardarDB();
};
formulario.addEventListener("submit", e => {
  e.preventDefault();
  let actividadUi = document.querySelector("#actividad").value;
  if (!actividadUi == "") {
    CrearItem(actividadUi);
    GuardarDB();
    formulario.reset();
  }
});
document.addEventListener("DOMContentLoaded", PintarDB);
actividades.addEventListener("click", e => {
  e.preventDefault();
  // esto verifica que hayamos presionado la imagen done o delete
  if (e.target.innerHTML === "done" || e.target.innerHTML === "delete") {
    let activity = e.path[2].childNodes[0].innerHTML;
    if (e.target.innerHTML === "done") {
      EditarDB(activity);
    }
    if (e.target.innerHTML === "delete") {
      EliminarDB(activity);
    }
  }
});