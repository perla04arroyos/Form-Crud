<template>
  <form @submit.prevent="procesarFormulario">
     <Input :tarea="tarea" />
  </form>
  
  <ListaTareas />
</template>

<script>
import Input from '../components/Input'
import ListaTareas from '../components/ListaTareas'

import {mapActions} from 'vuex'
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    Input, ListaTareas
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTarea']),
    procesarFormulario(){
      console.log(this.tarea);
      if(this.tarea.nombre.trim() === ""){
        console.log("Campo vacio")
        return
      }
      console.log("No esta vacio")

      //generar id
      this.tarea.id = shortid.generate()
      console.log(this.tarea.id)
      //se envian los datos
      this.setTarea(this.tarea)

      this.tarea = {
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  }
}
</script>
