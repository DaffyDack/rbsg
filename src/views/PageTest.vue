<script lang="ts">
import { defineComponent, watch, reactive } from 'vue'
import nestedDraggable from '../components/dragAndDrop/NestedList.vue'
import WrapHeader from '@/components/dragAndDrop/WrapHeader.vue'
export default defineComponent({
  name: 'nested-example',
  display: 'Nested',
  order: 15,
  components: {
    nestedDraggable,
    WrapHeader,
  },

  setup() {
    interface Task {
      name: string
      deadline: string
      start: string
      page: string
      id: string
      timeExecution: string
      preliminaryCost: string
      cost: string
      tasks: Task[] // Рекурсивная ссылка для вложенных задач
    }
    const list = reactive<Task[]>([
      {
        name: 'task 1',
        deadline: '10.10.2026',
        start: '12.04.2025, 14:55',
        page: 'projects',
        id: '1',
        timeExecution: '2ч',
        preliminaryCost: '12 000',
        cost: '12 000',
        tasks: [
          {
            name: 'task 1.1',
            deadline: '10.10.2026',
            start: '12.04.2025, 14:55',
            page: 'projects',
            id: '1.1',
            timeExecution: '2ч',
            preliminaryCost: '12 000',
            cost: '12 000',
            tasks: [
              {
                name: 'task 1.1',
                deadline: '10.10.2026',
                start: '12.04.2025, 14:55',
                page: 'projects',
                id: '1.2',
                timeExecution: '2ч',
                preliminaryCost: '12 000',
                cost: '12 000',
                tasks: [],
              },
            ],
          },
        ],
      },
      {
        name: 'task 2',
        deadline: '10.10.2026',
        start: '12.04.2025, 14:55',
        page: 'projects',
        id: '2',
        timeExecution: '2ч',
        preliminaryCost: '12 000',
        cost: '12 000',
        tasks: [],
      },
    ])

    function updateIds(tasks: Task[], parentId = '') {
      tasks.forEach((task, index) => {
        const newId = parentId ? `${parentId}.${index + 1}` : `${index + 1}`
        task.id = newId
        if (task.tasks && task.tasks.length > 0) {
          updateIds(task.tasks, newId)
        }
      })
    }
    watch(
      list,
      () => {
        updateIds(list)
      },
      { deep: true },
    )
    return { list }
  },
})
</script>
<template>
  <div class="sidebar">
    <div id="leftside-navigation" class="nano">
      <WrapHeader />
      <div class="wrapper_tree_proects">
        <nested-draggable :tasks="list" />
      </div>
      <div class="information_about_project">
        <ul>
          <li>
            <div class="title">Проект создан:</div>
            <div class="descriptions">12 апреля 2025</div>
          </li>
          <li>
            <div class="title">Проект создан:</div>
            <div class="descriptions">12 апреля 2025</div>
          </li>
          <li>
            <div class="title">Проект создан:</div>
            <div class="descriptions">12 апреля 2025</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sidebar {
  width: -webkit-fill-available;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  margin-right: 40px;

  .wrapper_tree_proects {
    max-height: 66vh;
    overflow: scroll;
  }

  & .nano {
    padding: 10px;
    background: #44444482;
    border-radius: 10px;
    max-height: 90vh;

    & .information_about_project {
      & ul {
        display: flex;
        color: #fff;
        padding: 50px 10px 10px;
        justify-content: space-around;

        & li {
          padding: 10px;

          & .title {
            font-size: 10px;
            display: block;
            text-align: center;
            margin: 0;
          }

          & .descriptions {
            font-size: 24px;
          }
        }
      }
    }

    & .title {
      margin-top: 10px;
      margin-bottom: 15px;
      color: #fff;
      font-size: 24px;
      display: flex;
    }
  }

  #leftside-navigation {
    ul {
      li {
        list-style-type: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

        &.active {
          & > a {
            color: #1abc9c;
          }

          & .descriptions {
            border-radius: 0;
          }
        }
      }
    }
  }
}
</style>
