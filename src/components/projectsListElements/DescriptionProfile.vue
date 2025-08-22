<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../../stores/counter'
const store = useCounterStore()

const imgW = ref({
  imgUrl: import.meta.env.VITE_API_URL,
})

const infoProfile = ref({
  img: store.info.img,
  id: store.info.id,
  jobfunctions: store.info.jobfunctions,
  firstname: store.info.firstname,
  lastname: store.info.lastname,
  patronymic: store.info.patronymic,
  department: store.info.department,
  positions: store.info.positions,
  telegram: store.info.telegram,
  datebirth: store.info.datebirth,
  role: store.info.role,
  gender: store.info.gender,
  company: store.info.company,
  locations: store.info.locations,
})

function countFullYaer(date: any) {
  const today = new Date()
  const [day, month, year] = date.split('.').map(Number)

  let birthdate = new Date(year, month - 1, day)
  if (isNaN(birthdate.getTime())) {
    console.error('Преданные данные дня рождения не корректны:', date);
    return NaN;
  }
  let age = today.getFullYear() - birthdate.getFullYear()
  const birthPassed = today.getMonth() > month || (today.getMonth() === month && today.getDate() >= day)
  if (!birthPassed) {
    age--;
  }

  return age
}

let age = countFullYaer(store.info.datebirth)

</script>




<template>
<<<<<<< HEAD
  <div class="descriptions_profile">
    <div class="descriptions_name">
      <p class="family">
=======
<<<<<<< HEAD
  <div class="descriptions_profile">
    <div class="descriptions_name">
      <p class="family">
=======
    <div class="descriptions_profile">
        <div class="descriptions_name">
            <p class="family">
            
                {{ infoProfile.lastname }} {{ infoProfile.firstname }} {{ infoProfile.patronymic }}
            </p>
        </div>
>>>>>>> origin/it2
>>>>>>> it2

        {{ infoProfile.lastname }} {{ infoProfile.firstname }} {{ infoProfile.patronymic }}
      </p>
    </div>

    <div class="descriptions_tema">
      <p class="descriptions">{{ infoProfile.positions }}, {{ infoProfile.department }}</p>
      <div class="logo">
        <img src="../../assets/krafter.svg" alt="logo" width="128px" />
      </div>
    </div>

    <div class="labelContact">

      <div>Прямой руководитель</div>
      <div>{{ infoProfile.patronymic }}</div>
      <div>День рождения</div>
      <div>123</div>
      <div>Совмещение</div>
      <div>{{ infoProfile.patronymic }}</div>
      <div>С нами</div>
      <div>{{ infoProfile.locations }}</div>
    </div>

    <div class="cards_information">
      <div class="card_form">
        <img class="imd_card" src="../../assets/location.svg" alt="Локация">
        <span class="text_card">{{ infoProfile.locations }}</span>
      </div>
      <div class="card_form">
        <img class="imd_card" src="../../assets/cake.svg" alt="Локация">
        <span class="text_card">{{ infoProfile.datebirth }}</span>
        <span class="text_age">{{ age }}</span>

      </div>
      <div class="card_form">
        <img class="imd_card" src="../../assets/group.svg" alt="Рабочая группа">
        <span>Рабочая группa</span>
        <span class="text_card">{{ infoProfile.department }}</span>
      </div>
    </div>
    <div class="jobfunctions">
      <div>Должностные обязаности:</div>
      <div class="text-description">{{ infoProfile.jobfunctions }}</div>
    </div>
  </div>
</template>


<style lang="scss">
.descriptions_profile {
  padding: 15px;

  .cards_information {
    // background: aliceblue;
    display: flex;
    justify-content: baseline;
    margin-top: 36px;


  }

  .card_form {
    height: 164px;
    width: 164px;
    background: green;
    margin-right: 10px;
    border-radius: 15px;
    background:
      linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
      linear-gradient(270deg, rgba(6, 75, 131, 0.15) 14.42%, rgba(0, 138, 251, 0.15) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  .text_card {
    text-align: center;
    font-family: Manrope;
    font-size: 16px;
    padding: 5px;
  }

  .descriptions_tema {
    border: 1px rgba(40, 44, 44, 1);
    width: 600px;
    font-size: 22px;
    height: 72px;
    display: flex;
    justify-content: space-around;
    margin-top: 36px;
    align-items: center;
    border-radius: 36px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
      linear-gradient(270deg, rgba(6, 75, 131, 0.15) 14.42%, rgba(0, 138, 251, 0.15) 100%);
  }

  .labelContact {
    color: white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 36px;
    // width: 703px;
    // height: 180px;
    font-family: Manrope;
    font-size: 16px;



    div:nth-child(odd) {
      // color: #939393;
      font-size: 14px;
    }

    div:nth-child(even) {
      color: #ffffff;
      font-size: 14px;

    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
  }
=======
        .card_form {
         height: 164px;
         width: 164px;
         margin-right: 10px;
         border-radius: 15px;
         padding: 20px 5px;
         background:
            linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
            linear-gradient(270deg, rgba(6, 75, 131, 0.15) 14.42%, rgba(0, 138, 251, 0.15) 100%);
         display: flex;
         flex-direction:column;
         align-items: center;
         justify-content: space-evenly;
         
        }
>>>>>>> origin/it2
>>>>>>> it2

    .card_form {
      height: 164px;
      width: 164px;
      margin-right: 10px;
      border-radius: 15px;
      padding: 20px 5px;
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
        linear-gradient(270deg, rgba(6, 75, 131, 0.15) 14.42%, rgba(0, 138, 251, 0.15) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

    }

    .family {
      font-size: 56px;
      word-wrap: normal
    }

    .text_age {
      color: #FFF;
      text-align: center;
      font-family: Manrope;
      font-size: 64px;
      font-style: normal;
      font-weight: 600;
      line-height: 74px
    }

    .jobfunctions {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)),
        linear-gradient(270deg, rgba(6, 75, 131, 0.15) 14.42%, rgba(0, 138, 251, 0.15) 100%);
      margin-top: 36px;
      align-items: center;
      padding: 32px;
      border-radius: 36px;
    }

    .text-description {
      margin-top: 15px;

    }
  }
}
</style>