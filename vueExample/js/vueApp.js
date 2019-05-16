const app = new Vue({
  el: "#gymVue",
  data: {
    titulo: "Gym con Vue",
    tareas: [],
    nuevaTarea: ""
  },
  methods: {
    agregarTarea: function() {
      if (!this.nuevaTarea.trim() == " ") {
        this.tareas.push({
          actividad: this.nuevaTarea.trim().replace(/\s+/gi, " "),
          estado: false
        });
        this.nuevaTarea = " ";
        localStorage.setItem("item", JSON.stringify(this.tareas));
      }
    },
    cambiarEstado: function(index) {
      this.tareas[index].estado = !this.tareas[index].estado;
      localStorage.setItem("item", JSON.stringify(this.tareas));
    },
    eliminarTarea: function(index) {
      this.tareas.splice(index, 1);
      localStorage.setItem("item", JSON.stringify(this.tareas));
    }
  },
  created: function() {
    this.tareas = JSON.parse(localStorage.getItem("item"));
    console.log(this.tareas)
    if ( this.tareas  === null) {
      this.tareas =[]
    
    }
  }
});
