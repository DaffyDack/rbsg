<script lang="ts">
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';



export default {
    props: {
        tasks: {
            required: true,
            type: Array,
        },
    },
    components: {
        draggable: VueDraggableNext,
        InputText,
        ButtonSpecial: Button,
        Avatar
    },
    setup() {
        const activeIndex = ref<number>(0)

        const editingProject = ref({
            deadline: '',
            timeExecution: '',
            start: '',
            preliminaryCost: '',
            nameProject: '',
        })
        function setActive(index: number) {

            if (activeIndex.value == index) {
                activeIndex.value = 0
            } else {
                activeIndex.value = index
            }
        }
        return { activeIndex, editingProject, setActive }
    },
    name: 'nested-draggable',


}
</script>
<template>
    <div>
        <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
            <li v-for="el in tasks" :key="el.name" class="sub-menu rounded-[10px] pt-1"
                :class="{ active: activeIndex === el.id }">
                <!-- <p>Название проекта: {{ el.name }} Начало проекта: {{ el.start }} Дедлайн: {{ el.deadline }}</p> -->
                <div
                    class="flex items-center p-3 bg-[#DFDFDF] rounded-tl-[10px] rounded-br-[0] rounded-tr-[10px] rounded-bl-[0]">
                    <div class="number-task">
                        <div class="id">{{ el.id }}</div>
                    </div>
                    <span class="link">{{ el.nameProject }}</span>
                    <i class="pi pi-file-edit unwrap" @click="setActive(el.id)"></i>
                </div>
                <div class="descriptions p-3 bg-[#DFDFDF] ">
                    <div class="time">
                        <ul>
                            <li>выполнить да:
                                {{ el.deadline }}
                            </li>
                            <li>Время на исполнение: {{ el.timeExecution }}</li>
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
                        <InputText class="w-[100%]" type="text" v-model="editingProject.nameProject"
                            :placeholder="el.nameProject" />
                    </li>
                    <li>
                        <span class="mr-2">Дата дедлайна:
                            <InputText type="text" v-model="editingProject.deadline" :placeholder="el.deadline" />
                        </span>
                        <span class="mr-2">Время на исполнение:
                            <InputText type="text" v-model="editingProject.timeExecution"
                                :placeholder="el.timeExecution" />
                        </span>
                        <span class="mr-2">Начать:
                            <InputText type="text" v-model="editingProject.start" :placeholder="el.start" />
                        </span>
                    </li>
                    <li class="flex">
                        <span class="mr-2">Предварительная стоимость:
                            <InputText type="text" v-model="editingProject.preliminaryCost"
                                :placeholder="el.preliminaryCost" />
                        </span>
                        <span class="mr-2">Прикрепленные документы:
                            <ButtonSpecial label="Прикрепленные документы" severity="secondary" icon="pi pi-file-plus"
                                size="Normal" />

                        </span>
                        <span class="mr-2">
                            <div class="card flex justify-content-center">

                            </div>
                        </span>
                        <span></span>
                    </li>
                    <li>
                        <span class="mr-2">
                            <ButtonSpecial label="Принять исправления" severity="success" icon="pi pi-check"
                                size="Normal" />
                        </span>
                        <span>
                            <ButtonSpecial label="Отмена" severity="danger" icon="pi pi-times" size="Normal" />
                        </span>
                    </li>
                </ul>

                <nested-draggable :tasks="el.tasks" class="pl-5" />
            </li>
        </draggable>
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

.sidebar {
    & .sub-menu {
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
            min-width: 30px;
            height: 30px;
            margin-right: 5px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
        }
    }

    #leftside-navigation {


        li {
            list-style-type: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);

            &.active {
                &>a {
                    color: #1abc9c;
                }

                &>ul.content_projects {
                    display: block;
                }

                &>.descriptions {
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

.dragArea {
    // min-height: 50px;
    // outline: 1px dashed;
}
</style>