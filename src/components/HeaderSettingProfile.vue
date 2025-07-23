<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'
const store = useCounterStore()

const imgW = ref({
  imgUrl: import.meta.env.VITE_API_URL,
})

const infoProfile = ref({
  img: store.info.img,
  id: store.info.id,
  firstname: store.info.firstname,
  lastname: store.info.lastname,
  patronymic: store.info.patronymic,
  department: store.info.department,
  positions: store.info.positions,
})
</script>
<template>
  <div class="title">
    <div class="container">
      <div class="img" :style="{ backgroundImage: 'url(' + imgW.imgUrl + '/' + infoProfile.img + ')' }"></div>
      <div class="container_description">
        <div class="mr-10">
          <div class="id">ID {{ infoProfile.id }}</div>
          <p class="family">
            {{ infoProfile.lastname }} {{ infoProfile.firstname }} {{ infoProfile.patronymic }}
          </p>
          <p class="descriptions">{{ infoProfile.positions }}, {{ infoProfile.department }}</p>
          <div class="status">
            <div class="rating">
              <span>Senior </span>
              <span class="number">10</span>
            </div>
            <div class="yearsInCompany">10 лет 7 месяцев в компании</div>
          </div>
        </div>
        <div class="logo">
          <img src="../assets/Ateri.png" alt="logo" width="85" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  margin-top: 10px;
  margin-bottom: 15px;
  color: #fff;
  font-size: 24px;
  display: flex;
  width: 100%;
  justify-content: space-between;

  .container {
    display: flex;

    .img {
      max-width: 200px;
      max-height: 200px;
      min-width: 200px;
      min-height: 200px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      background-size: cover;
    }

    .avatar {
      margin-right: 10px;
      border-radius: 100%;
      overflow: hidden;
    }
  }

  .container_description {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .descriptions {
      font-size: 14px;
      color: #202224;
      margin-bottom: 3px;
    }

    .id {
      font-size: 10px;
      color: #939393;
    }

    .family {
      color: #202224;
      font-size: 24px;
      text-transform: capitalize;
    }

    .status {
      display: flex;

      .rating {
        font-size: 16px;
        background: #202224;
        border-radius: 24px;
        padding: 6px 14px;
        margin-right: 10px;

        .number {
          color: #0a83c1;
        }
      }

      .yearsInCompany {
        font-size: 10px;
        color: #939393;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
