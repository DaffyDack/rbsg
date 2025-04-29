<script setup lang="ts">
import { ref, computed } from 'vue'
import {useRoute} from 'vue-router'
import { RouterLink } from 'vue-router'



const route = useRoute()
const id = computed(() => route.params.id)



const activeIndex = ref(null)
const items = ref([{ page: 'projects', id: 1, nameProject: 'Создать рабочий стол' }, { page: 'projects', id: 2, nameProject: 'Собрать мангал' }, { page: 'projects', id: 3, nameProject: 'Настроить комп' }])



const setActive = (index: any) => {
  console.log(index, activeIndex.value)
  if (activeIndex.value == index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index;
  }
};



</script>

<template>
  <div class="sidebar">
    <div id="leftside-navigation" class="nano">
      <ul class="nano-content">

        <li class="sub-menu rounded-[10px]" v-for="(item, index) in items" :key="index"
          :class="{ 'active': activeIndex === index }">
          <div class="flex items-center ">
            <i class="pi pi-angle-down unwrap" @click="setActive(index)"></i>
            <RouterLink :to="{ name: item.page, params: { id: item.id } }">
              <i class="pi pi-file-edit unwrap"></i>
            </RouterLink>
            <a href="" class="link"><span>{{ item.nameProject }}</span></a>
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
            // width: 20px;

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
