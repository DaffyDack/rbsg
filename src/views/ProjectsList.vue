<script setup lang="ts">
import { ref } from 'vue'
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Tree from '../components/projectsListElements/TreeWrapTest.vue';

const items = ref([
  {
    page: 'projects', id: 1, nameProject: 'Создать рабочий стол', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', children: [{
      page: 'projects', id: 1.1, nameProject: 'Купить монитор'
    }]
  },
  { page: 'projects', id: 2, nameProject: 'Собрать мангал', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000' },
  {
    page: 'projects', id: 3, nameProject: 'Настроить комп', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', children: [{
      page: 'projects', id: 3.1, nameProject: 'Купить монитор'
    }, {
      page: 'projects', id: 3.2, nameProject: 'Купить монитор', children: [{
        page: 'projects', id: 3.21, nameProject: 'Купить монитор'
      }]
    }]
  },

])
</script>

<template>
  <div class="sidebar">
    <div id="leftside-navigation" class="nano">
      <div class="title">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
        <div class="mr-10 ml-3">Название проекта</div>
        <AvatarGroup>
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" shape="circle" />
          <Avatar label="+2" shape="circle" />
        </AvatarGroup>
      </div>
      <div class="wrapper_tree_proects">
        <div v-for="(item, i) in items" :key="i">
          <tree :tree-data="item"></tree>
        </div>
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
  position: absolute;
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
          &>a {
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
