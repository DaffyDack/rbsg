<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import Select from 'primevue/select'

interface Form {
  cantry: string
}
const form = ref<Form>({
  cantry: '',
})

const cantry = ref([
  { name: 'USER', code: 'USER' },
  { name: 'ADMIN', code: 'ADMIN' },
])
</script>

<template>
  <div>
    <div class="container">
      <div class="left_container">
        <div class="mb-2">Паспортные данные</div>
        <div class="group_form-control-tree">
          <div class="form-control">
            <input type="number" placeholder="Серия" />
          </div>
          <div class="form-control">
            <input type="number" placeholder="Номер" />
          </div>
          <div class="form-control">
            <input type="number" placeholder="Дата выдачи" />
          </div>
        </div>
        <div class="form-control">
          <input type="text" placeholder="кем выдан" />
        </div>
        <div class="mb-2">Гражданство</div>
        <div class="form-control">
          <Select
            v-model="form.cantry"
            id="assignRating"
            :options="cantry"
            optionLabel="name"
            placeholder="Выбирите страну"
            class="w-full"
          />
        </div>
      </div>
      <div>
        <div class="mb-2">Гражданство</div>
        <div class="form-control">
          <textarea name="story"></textarea>
        </div>
        <div class="mb-2">Предидущий паспорт</div>
        <div class="form-control">
          <input type="text" placeholder="серия, номер, дата выдачи, кем выдан" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: grid;
  grid-auto-flow: row dense;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.1fr;
  gap: 10px 10px;
  grid-template-areas: '. .';

  .left_container {
  }

  textarea {
    min-height: 110px;
  }
}
</style>
