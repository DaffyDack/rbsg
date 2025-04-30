import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', () => {
  const projectsList = ref([
    { page: 'projects', id: 1, nameProject: 'Создать рабочий стол' },
    { page: 'projects', id: 2, nameProject: 'Собрать мангал' },
    { page: 'projects', id: 3, nameProject: 'Настроить комп' },
    { page: 'projects', id: 4, nameProject: 'Настроить программы' },
    { page: 'projects', id: 5, nameProject: 'Сделка' },
    { page: 'projects', id: 6, nameProject: 'Лид' },
    { page: 'projects', id: 7, nameProject: 'Крафтер' },
    { page: 'projects', id: 8, nameProject: 'Крафтер' },
  ])

  function addedProjectStore (e:any) {
    let a = projectsList.value.length + 1
    projectsList.value.push({ page: 'projects', id: a, nameProject: e }) 
  }


  return { projectsList, addedProjectStore }
})
