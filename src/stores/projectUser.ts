import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', () => {
  const projectsList = ref([
    { data: '02.10.2027', page: 'projects', id: 1, nameProject: 'Создать рабочий стол' },
    { data: '12.10.2027', page: 'projects', id: 2, nameProject: 'Собрать мангал' },
    { data: '20.10.2027', page: 'projects', id: 3, nameProject: 'Настроить комп' },
    { data: '16.10.2027', page: 'projects', id: 4, nameProject: 'Настроить программы' },
    { data: '12.10.2027', page: 'projects', id: 5, nameProject: 'Сделка' },
    { data: '02.01.2027', page: 'projects', id: 6, nameProject: 'Лид' },
    { data: '02.05.2027', page: 'projects', id: 7, nameProject: 'Крафтер' },
    { data: '02.11.2027', page: 'projects', id: 8, nameProject: 'Крафтер' },
  ])

  function addedProjectStore(e: string) {
    const a = projectsList.value.length + 1
    projectsList.value.push({ data: '02.11.2026', page: 'projects', id: a, nameProject: e })
  }

  return { projectsList, addedProjectStore }
})
