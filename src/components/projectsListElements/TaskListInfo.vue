<script setup lang="ts">

// import Avatar from 'primevue/avatar';
// import AvatarGroup from 'primevue/avatargroup';
// import InputText from 'primevue/inputtext';
// import Button from 'primevue/button';
// import { useToast } from "primevue/usetoast";
// const toast = useToast();


// import FileUpload from 'primevue/fileupload';


// const activeIndex = ref()
// const deadline = ref('');
// const timeExecution = ref('');
// const start = ref('');
// const preliminaryCost = ref('');
// const nameProject = ref('');


// const items = ref([
//   {
//     page: 'projects', id: 1, nameProject: 'Создать рабочий стол', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', children: [{
//       page: 'projects', id: 1.1, nameProject: 'Купить монитор'
//     }]
//   },
//   { page: 'projects', id: 2, nameProject: 'Собрать мангал', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000'},
//   {
//     page: 'projects', id: 3, nameProject: 'Настроить комп', deadline: '10.10.2026', timeExecution: '2ч', start: '12.04.2025, 14:55', cost: '12 000', preliminaryCost: '12 000', children: [{
//       page: 'projects', id: 3.1, nameProject: 'Купить монитор'
//     }, {
//       page: 'projects', id: 3.2, nameProject: 'Купить монитор'
//     }]
//   },

// ])

// const setActive = (index: number) => {
//     console.log(index, activeIndex.value)
//     if (activeIndex.value == index) {
//         activeIndex.value = 0
//     } else {
//         activeIndex.value = index
//     }
// }

// const onUpload = () => {
//     toast.add({ severity: 'secondary', summary: 'secondary', detail: 'File Uploaded', life: 3000 });
// };

// const changeDate = (e: number) => {
//     items.value[e - 1].deadline = deadline.value
//     deadline.value = ''
// }
// const closed = (e: number) => {
//     deadline.value = items.value[e - 1].deadline
// }
</script>
<template>
    <div>


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
                                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                                    class="ml-2" shape="circle" />
                            </li>
                            <li><span>Наблюдатель:</span>
                                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
                                    class="ml-2" shape="circle" />
                            </li>
                            <li><span>Утверждает:</span>
                                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png"
                                    class="ml-2" shape="circle" />
                            </li>
                        </ul>
                    </div>
                </div>
                <ul
                    class="content_projects bg-[#DFDFDF] rounded-tl-[0] rounded-br-[10px] rounded-tr-[0] rounded-bl-[10px]">
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
                            <Button label="Прикрепленные документы" severity="secondary" icon="pi pi-file-plus"
                                size="Normal" />

                        </span>
                        <span class="mr-2">
                            <div class="card flex justify-content-center">
                                <Toast />
                                <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*"
                                    :maxFileSize="1000000" @upload="onUpload" :auto="true"
                                    chooseLabel="Прикрепить документ" />
                            </div>
                        </span>
                        <span></span>
                    </li>
                    <li>
                        <span class="mr-2">
                            <Button @click="changeDate(item.id)" label="Принять исправления" severity="success"
                                icon="pi pi-check" size="Normal" /></span>
                        <span><Button label="Отмена" @click="closed(item.id)" severity="danger" icon="pi pi-times"
                                size="Normal" /></span>
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

    </div>
</template>

<style lang="scss" scoped></style>