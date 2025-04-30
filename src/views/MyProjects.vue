<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';

import { useProjectsStore } from '../stores/projectUser'

const store = useProjectsStore()

const name_project = ref<string>('')
const activeIndex = ref(null)



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
  return store.projectsList.filter(function (elem) {
    if (comp === '') return true;
    else return elem.nameProject.indexOf(comp) > -1;
  })
})



function addProject() {
  store.addedProjectStore('Rhfanth')
}



</script>

<template>
  <div class="sidebar">
    <div class="card flex justify-content-center">
      <FloatLabel class="w-[100%]">
        <InputText class="w-[100%]" size="small" id="username" v-model="name_project" />
        <label for="username">Тип проекта</label>
      </FloatLabel>
    </div>
    <div id="leftside-navigation" class="nano mt-5">
      <ul class="nano-content">

        <li class="sub-menu rounded-[10px]" v-for="(item, index) in filteredList" :key="index"
          :class="{ 'active': activeIndex === index }">
          <div class="flex items-center ">
            <i class="pi pi-angle-down unwrap" @click="setActive(index)"></i>
            <RouterLink :to="{ name: item.page, params: { id: item.id } }">
              <i class="pi pi-file-edit unwrap"></i>
            </RouterLink>
            <div class="link">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" class="mr-2"
                shape="circle" />
              {{ item.nameProject }}
            </div>
            <div class="link">
              <AvatarGroup>
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" shape="circle" />
                <Avatar label="+2" shape="circle" />
              </AvatarGroup>
              <div class="ml-4">Завершить до: {{ item.data }}</div>

            </div>
          </div>
          <ul>
            <li class="p-5">
              <div class="flex">
                <div class="w-[15%] flex-none percentCompleted">
                  <div class="text-[20px] w-[80%] bg-black">Выполнено</div>
                  <div class="text-[58px] w-[80%] bg-black">15%</div>
                </div>
                <div class="w-[70%] flex-1 ">02</div>
                <div class="w-[15%] flex justify-center content-center items-center">
                  <span>
                    <div class="w-[80%] text-center text-[#fff] bg-[#6ada11] p-[10px] rounded-[10px]">Проект завершен</div>
                  </span>
                </div>
              </div>
              <div class="logs">Logs</div>
            </li>
          </ul>
        </li>

      </ul>
    </div>
    <Button @click="addProject()" label="Добавить" icon="pi pi-check" size="small" class="mt-2" />
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
    background: #293949a1;
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

        & .percentCompleted {
          color: #fff;
          display: flex;
          align-items: stretch;
          flex-direction: column;
          padding: 5px;

          &>div {
            display: flex;
            justify-content: center;
            align-items: center;
            &:nth-child(1) {
              border-radius: 15px 15px 0 0;
              padding-top: 8px;
            }
            &:nth-child(2) {
              border-radius:  0 0 15px 15px;
            }
          }
        }

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
          padding: 10px 25px 10px 25px;
          font-size: 12px;
          outline: 0;
          transition: all 200ms ease-in;
          display: flex;
          align-content: center;
          align-items: center;

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
