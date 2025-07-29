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

// console.log('url(' + imgW.imgUrl + '/' + infoProfile.img + ')')
</script>
<template>
  <div class="title">
    
      <div class="img" :style="{ backgroundImage: 'url(' + imgW.imgUrl + '/' + infoProfile.img + ')' }"></div>
          <div class="status">
            <div class="rating">
              <span class="el_rating">Senior </span>
              <span class="number">10</span>
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

  
   position: relative;

    .img {
      
      width: 100%;
      height: 100vh;
     
     
      border-radius: 36px;
      overflow: hidden;
      margin-right: 10px;
      background-size: cover;
      height: 100%;
    }

    .avatar {
      margin-right: 10px;
      border-radius: 100%;
      overflow: hidden;
    }
  

    
    .el_rating {
      padding: 10px;
    }

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
        position: absolute;
        top:40px;
        right: 40px;
      .rating {
       
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        background-color:rgba(130, 159, 255, 0.2);
        border-radius: 50px;
        padding: 6px 14px;
        margin-right: 10px;
        width: 205px;
        height: 72px;
        flex-direction: row;
       align-items: center;
        margin: 0 10px;

        .number {
          color: white;
          background-color: rgba(10, 131, 193, 1);
          height: 46px;
          width: 46px;
          border-radius: 50%;
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
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

</style>
