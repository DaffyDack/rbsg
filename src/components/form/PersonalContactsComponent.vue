<script setup lang="ts">
import InputMask from 'primevue/inputmask';


</script>


<template>
  <div>
    <div class="group_form-control-two">
      <div class="form-control">
        <label for="PersonalContactTel">Телефон</label>
        <InputMask type="text" mask="+7 999-999-9999" id="PersonalContactTel" placeholder="Телефон" />
      </div>
      <div class="form-control">
        <label for="PersonalContactTelMab">Телефон моб.</label>
        <InputMask type="text" mask="+7 999-999-9999" id="PersonalContactTelMab" placeholder="Телефон моб." />
      </div>
    </div>
    <div class="group_form-control-two">
      <div class="form-control">
        <label for="PersonalContactEmail">E-mail</label>
        <input type="text" id="PersonalContactEmail" placeholder="E-mail" />
      </div>
      <div class="form-control">
        <label for="PersonalContactEmail2">E-mail 2</label>
        <input type="text" id="PersonalContactEmail2" placeholder="E-mail 2" />
      </div>
    </div>
  </div>
</template>
