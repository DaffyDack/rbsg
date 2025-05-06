<script setup lang="ts">
import { ref } from 'vue'
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Tree from '../components/projectsListElements/TreeWrap.vue';
// import InputText from 'primevue/inputtext';
// import Button from 'primevue/button';
// import { useToast } from "primevue/usetoast";
// const toast = useToast();


// import FileUpload from 'primevue/fileupload';


// const activeIndex = ref<number>()
// const deadline = ref('');
// const timeExecution = ref('');
// const start = ref('');
// const preliminaryCost = ref('');
// const nameProject = ref('');

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
      page: 'projects', id: 3.2, nameProject: 'Купить монитор'
    }]
  },

])



// ТОЧНО НАБОТАЕТ!!!

// const items = ref({
//   page: 'projects', id: 1, nameProject: 'Создать рабочий стол', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', children: [
//     {
//     page: 'projects', id: 1.1, nameProject: 'Купить монитор', children: [{
//       page: 'projects', id: 1.2, nameProject: 'Купить монитор',
//     }]
//   }]
// })

// const setActive = (index: number) => {
//   console.log(index, activeIndex.value)
//   if (activeIndex.value == index) {
//     activeIndex.value = 0
//   } else {
//     activeIndex.value = index
//   }
// }

// const onUpload = () => {
//   toast.add({ severity: 'secondary', summary: 'secondary', detail: 'File Uploaded', life: 3000 });
// };

// const changeDate = (e: number) => {
//   items.value[e-1].deadline = deadline.value 
//   deadline.value = ''
// }
// const closed = (e: number) => {
//   deadline.value = items.value[e-1].deadline
// }

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
      <h1>Рекурсивный компонент</h1>
      <div v-for="(item, i) in items" :key="i">
        <tree :tree-data="item"></tree>
      </div>
      <!-- <ul class="nano-content">
        <li class="sub-menu rounded-[10px] pt-1" v-for="(item, index) in items" :key="index"
          :class="{ active: activeIndex === index }">
          <div
            class="flex items-center p-3 bg-[#DFDFDF] rounded-tl-[10px] rounded-br-[0] rounded-tr-[10px] rounded-bl-[0]">
            <div class="number-task">
              <div class="id">{{ item.id }}</div>
            </div>
            <span class="link">{{ item.nameProject }}</span>
            <i class="pi pi-file-edit unwrap" @click="setActive(index)"></i>
          </div>
          <div class="descriptions p-3 bg-[#DFDFDF] ">
            <div class="time">
              <ul>
                <li>выполнить да:
                  {{ item.deadline }}
                </li>
                <li>Время на исполнение: {{ item.timeExecution }}</li>
                <li>начать по</li>
              </ul>
            </div>
            <div class="performers">
              <ul>
                <li><span>Исполнитель:</span>
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="ml-2"
                    shape="circle" />
                </li>
                <li><span>Наблюдатель:</span>
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" class="ml-2"
                    shape="circle" />
                </li>
                <li><span>Утверждает:</span>
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" class="ml-2"
                    shape="circle" />
                </li>
              </ul>
            </div>
          </div>
          <ul class="content_projects bg-[#DFDFDF] rounded-tl-[0] rounded-br-[10px] rounded-tr-[0] rounded-bl-[10px]">
            <li>
              <InputText class="w-[100%]" type="text" v-model="nameProject" :placeholder="item.nameProject" />
            </li>
            <li>
              <span class="mr-2">Дата дедлайна:
                <InputText type="text" v-model="deadline" :placeholder="item.deadline" />
              </span>
              <span class="mr-2">Время на исполнение:
                <InputText type="text" v-model="timeExecution" :placeholder="item.timeExecution" />
              </span>
              <span class="mr-2">Начать:
                <InputText type="text" v-model="start" :placeholder="item.start" />
              </span>
            </li>
            <li class="flex">
              <span class="mr-2">Предварительная стоимость:
                <InputText type="text" v-model="preliminaryCost" :placeholder="item.preliminaryCost" />
              </span>
              <span class="mr-2">Прикрепленные документы:
                <Button label="Прикрепленные документы" severity="secondary" icon="pi pi-file-plus" size="Normal" />

              </span>
              <span class="mr-2">
                <div class="card flex justify-content-center">
                  <Toast />
                  <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000"
                    @upload="onUpload" :auto="true" chooseLabel="Прикрепить документ" />
                </div>
              </span>
              <span></span>
            </li>
            <li>
              <span class="mr-2">
                <Button @click="changeDate(item.id)" label="Принять исправления" severity="success" icon="pi pi-check" size="Normal" /></span>
              <span><Button label="Отмена" @click="closed(item.id)" severity="danger" icon="pi pi-times" size="Normal" /></span>
            </li>
          </ul>
          <template v-if="item.subtask?.length !== 0">
            <div v-for="(sub, index) in item.subtask" :key="index"
              class="bg-[#DFDFDF] mt-[10px] rounded-[10px] ml-[30px]">
              <div class="flex items-center p-3">
                <div class="number-task">
                  <div class="id">{{ sub.id }}</div>
                </div>
                <span class="link">{{ sub.nameProject }}</span>
              </div>
            </div>
          </template>
</li>
</ul> -->
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
.unwrap {
  margin: 0 5px 0 5px;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  background: #06A80B;
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

    & .nano-content {
      overflow: scroll;
      max-height: 66vh;

      &>li {
        // background: #DFDFDF;
      }
    }
  }

  & .sub-menu {
    // background: #293949;
    margin-bottom: 10px;

    & .link {
      width: 100%;
    }

    & .descriptions {
      border-top: 1px solid #b3b3b3;
      display: flex;
      justify-content: space-between;
      border-radius: 0 0 10px 10px;

      & .time {
        & ul {
          display: flex;

          & li {
            margin-right: 10px;
            padding-right: 10px;
            border-right: 1px solid #000;

            &:last-child {
              border: none;
            }
          }
        }
      }

      & .performers {
        & ul {
          display: flex;

          & li {
            display: flex;
            align-items: center;
            padding-right: 10px;
          }
        }
      }
    }

    & .number-task {
      background: #353535;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      margin-right: 5px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
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

          ul.content_projects {
            display: block;
          }

          & .descriptions {
            border-radius: 0;
          }
        }

        a.link {
          color: #aeb2b7;
          text-decoration: none;
          display: block;
          padding: 18px 0 18px 25px;
          font-size: 12px;
          outline: 0;
          width: 100%;
          -webkit-transition: all 200ms ease-in;
          -moz-transition: all 200ms ease-in;
          -o-transition: all 200ms ease-in;
          -ms-transition: all 200ms ease-in;
          transition: all 200ms ease-in;

          &:hover {
            color: #1abc9c;
          }

          span {
            display: inline-block;
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

    ul ul.content_projects {
      display: none;

      li {
        margin-bottom: 0;
        margin-left: 0;
        margin-right: 0;
        border-bottom: none;
        padding: 10px;

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
