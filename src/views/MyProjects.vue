<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

const name_project = ref('')


const activeIndex = ref(null)
const items = ref([
  { page: 'projects', id: 1, nameProject: 'Создать рабочий стол' },
  { page: 'projects', id: 2, nameProject: 'Собрать мангал' },
  { page: 'projects', id: 3, nameProject: 'Настроить комп' },
  { page: 'projects', id: 4, nameProject: 'Настроить программы' },
  { page: 'projects', id: 5, nameProject: 'Сделка' },
  { page: 'projects', id: 6, nameProject: 'Лид' },
  { page: 'projects', id: 7, nameProject: 'Крафтер' },
  { page: 'projects', id: 7, nameProject: 'Крафтер' },
])



const setActive = (index: any) => {
  console.log(index, activeIndex.value)
  if (activeIndex.value == index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index;
  }
};

const filteredList = computed(() => {
  let comp = name_project.value;
  return items.value.filter(function (elem) {
    if (comp === '') return true;
    else return elem.nameProject.indexOf(comp) > -1;
  })
})



</script>

<template>
  <div class="sidebar">
    <div class="card flex justify-content-center">
        <FloatLabel class="w-[100%]">
            <InputText class="w-[100%] mt-5 mb-5" size="small" id="username" v-model="name_project" />
            <label for="username">Тип проекта</label>
        </FloatLabel>
    </div>
    <div id="leftside-navigation" class="nano">
      <ul class="nano-content">

        <li class="sub-menu rounded-[10px]" v-for="(item, index) in filteredList" :key="index"
          :class="{ 'active': activeIndex === index }">
          <div class="flex items-center ">
            <i class="pi pi-angle-down unwrap" @click="setActive(index)"></i>
            <RouterLink :to="{ name: item.page, params: { id: item.id } }">
              <i class="pi pi-file-edit unwrap"></i>
            </RouterLink>
            <div class="link"><span>{{ item.nameProject }}</span></div>
          </div>
          <ul>
            <li><a href="tables-basic.html" class="link">Basic Tables</a>
            </li>

            <li><a href="tables-data.html" class="link">Data Tables</a>
            </li>
          </ul>
        </li>

      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.unwrap {
  margin: 0 5px 0 5px;
  color: #7d7c7c;
  cursor: pointer;
  padding: 10px;
  background: #fff;
  border-radius: 5px;

}

.sidebar-toggle {
  margin-left: -240px;
}

.sidebar {
  width: -webkit-fill-available;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  margin-right: 40px;

  & .sub-menu {
    background: #293949;
    margin-bottom: 10px;
  }

  #leftside-navigation {

    ul,
    ul ul {
      margin: -2px 0 0;
      padding: 0;
    }

    ul {
      li {
        list-style-type: none;
        border-bottom: 1px solid rgba(255, 255, 255, .05);

        &.active {
          &>a {
            color: #1abc9c;
          }

          ul {
            display: block;
          }
        }

        div.link {
          color: #aeb2b7;
          text-decoration: none;
          display: block;
          padding: 18px 0 18px 25px;
          font-size: 12px;
          outline: 0;
          width: 100%;
          transition: all 200ms ease-in;

          &:hover {
            color: #1abc9c;
          }

          span {
            display: inline-block;
            &:hover {
              cursor: default;
            }
          }

          i {
            .fa-angle-left,
            .fa-angle-right {
              padding-top: 3px;
            }
          }
        }
      }
    }

    ul ul {
      display: none;

      li {
        background: #23313f;
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
        border-bottom: none;

        a {
          font-size: 12px;
          padding-top: 13px;
          padding-bottom: 13px;
          color: #aeb2b7;
        }
      }
    }
  }
}
</style>
