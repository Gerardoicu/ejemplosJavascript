$(document).ready(function () {
  let tareas = []
  tareas = JSON.parse(localStorage.getItem('item'))
  if (tareas === null) {
    tareas = []
  }
  // metodos
  const PintarActividades = () => {
    $('#actividades .alert').remove()
    tareas.forEach((element, index) => {
      if (element.estado) {
        $('#actividades').append(
          '<div id= "' +
            index +
            '" class="alert alert-success float-center mt-4 offset-3 col-6" role="alert"><b>' +
            (index + 1) +
            '.-' +
            element.actividad +
            '</b><i  class="material-icons">accessibility_new</i><span class="float-right">' +
            element.estado +
            '<i class="material-icons">done</i><i class="material-icons">delete</i></span></div>'
        )
      } else {
        $('#actividades').append(
          '<div id="' +
            index +
            '" class="alert alert-danger float-center mt-4 offset-3 col-6" role="alert"><b>' +
            (index + 1) +
            '.-' +
            element.actividad +
            '</b><i  class="material-icons">accessibility_new</i><span class="float-right">' +
            element.estado +
            '<i class="material-icons">d done</i><i class="material-icons">delete</i></span></div>'
        )
      }
    })
  }
  PintarActividades()
  const EditarEstado = index => {
    tareas[index].estado = !tareas[index].estado
    localStorage.setItem('item', JSON.stringify(tareas))
    PintarActividades()
  }
  const EliminarTarea = index => {
    tareas[index].estado = !tareas[index].estado
    tareas.splice(index, 1)
    localStorage.setItem('item', JSON.stringify(tareas))
    PintarActividades()
  }
  const crearTarea = actividad => {
    tarea = {
      actividad: actividad,
      estado: false
    }
    return tarea
  }
  $('#agregar').click(function (e) {
    e.preventDefault()
    if (!$('#actividad').val().trim() == ' ') {
      tareas.push(crearTarea($('#actividad').val().trim()))
      localStorage.setItem('item', JSON.stringify(tareas))
      PintarActividades()
    }
  })
  $(document).on('click', '#actividades div span i', function (e) {
    let opcion = $(this).text()
    let index = $(this)
      .parent()
      .parent()
      .attr('id')
    if (opcion === 'delete') {
      EliminarTarea(index)
    } else {
      EditarEstado(index)
    }
  })
})