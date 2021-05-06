import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    }
  },
  mutations: {
    cargar(state, payload){
      state.tareas = payload
    },
    setTarea(state, payload){
      state.tareas.push(payload)
    },
    deleteTarea(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    getTarea(state, payload){
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    updateTarea(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {
    async cargarLocalStorage({ commit }){
      try {
        const res = await fetch(`https://uedemi-api-default-rtdb.firebaseio.com/tareas.json`)
        const dataDB = await res.json()
        
        const arrayTareas = []

        for(let index in dataDB){
          arrayTareas.push(dataDB[index])
        }

        commit('cargar', arrayTareas)

      } catch (error) {
        console.log(error)
      }
    },
    async setTarea({ commit }, tarea){
      try {
        await fetch(`https://uedemi-api-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })
      } catch (error) {
        console.log(error)
      }

      commit('setTarea', tarea)
    },
    async deleteTarea({ commit }, id){
      try {
        await fetch(`https://uedemi-api-default-rtdb.firebaseio.com/tareas/${id}.json`,{
          method: 'DELETE',
        })
        commit('deleteTarea', id)

      } catch (error) {
        console.log(error)
      }  
    },
    getTarea({ commit }, id){
      commit('getTarea', id)
    },
    async updateTarea({ commit }, tarea){
      try {
        const res = await fetch(`https://uedemi-api-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })

        const dataDB = await res.json()

        commit('updateTarea', dataDB)

      } catch (error) {
        console.log(error)
      }
      
    }
  },
  modules: {
  }
})
