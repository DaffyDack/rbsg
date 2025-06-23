<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import Select from 'primevue/select';
</script>
<template>
    <div>
        <div>
            <div class="group_form-control-four">
                <div class="form-control">
                    <label for="company">Компания</label>
                    <select name="pets" id="company">
                        <option value="ООО «РБС ГРУПП»">ООО «РБС ГРУПП»</option>
                        <option value="ООО «КРАФТЕР»">ООО «КРАФТЕР»</option>
                        <option value="ИП Т">ИП Т</option>
                        <option value="ИП К">ИП К</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="brand">Бренд</label>
                    <select name="pets" id="brand">
                        <option value="Генеральный директор">Генеральный директор</option>
                        <option value="Испольнительный директор">Испольнительный директор</option>
                        <option value="Финансовый директор">Финансовый директор</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="department">Отдел</label>
                    <select name="pets" id="department">
                        <option value="М">Муж</option>
                        <option value="Ж">Жен</option>
                    </select>
                </div>
                <div class="form-control">
                    <label for="post">Должность</label>
                    <select name="pets" id="post">
                        <option value="Генеральный директор">Генеральный директор</option>
                        <option value="Испольнительный директор">Испольнительный директор</option>
                        <option value="Финансовый директор">Финансовый директор</option>
                    </select>
                </div>
            </div>
            <div class="group_form-control-tree">
                <div class="form-control">
                    <label for="DateOfficialEmployment">Дата официального трудоустройства</label>
                    <input type="text" id="DateOfficialEmployment" placeholder="Дата официального трудоустройства" />
                </div>
                <div class="form-control">
                    <label for="StartDate">Дата начала работы</label>
                    <input type="text" id="StartDate" placeholder="Дата начала работы" />
                </div>
                <div class="form-control">
                    <label for="ProbationPeriodUntil">Испытательный срок до</label>
                    <input type="text" id="ProbationPeriodUntil" placeholder="Испытательный срок до" />
                </div>
            </div>

        </div>
    </div>
</template>