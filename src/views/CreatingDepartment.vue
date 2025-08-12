<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Select from 'primevue/select'
import Tree from 'primevue/tree';
import { creadetDepartment, fetchDepartment } from '../http/userAPI.js'

const usersString = ref()
const departments = ref()
const departmentTree = ref()
const expandedKeys = ref({
    '0': true,
    '0-0': true,
    '0-1': true,
    '0-2': true,
    '0-3': true,
    '0-4': true,
    '0-5': true,
    '0-6': true,
    '0-7': true,
    '0-8': true,
    '0-9': true,
    '0-10': true,
    '0-11': true,
    '0-12': true,
    '0-13': true,
    '0-14': true,
});

interface TreeNode {
    key: string;
    label: string
    data: object
    // icon: string
    children: TreeNode[];
}

interface Form {
    fullname: any,
    department: string,
    post: string
    department_description: string,
    department_affiliation: any,
    code: string
}
const form = ref<Form>({
    fullname: '',
    department: '',
    post: '',
    department_description: '',
    department_affiliation: '',
    code: '',
})
const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)

const existingDepartments = ref([
    { name: 'Администрация', code: '0' },
    { name: 'Тендерный отдел', code: '0-0' },
    { name: 'Юр отдел', code: '0-0-0' }
])

onMounted(() => {
    usersString.value = JSON.parse(localStorage.getItem('users') ?? '[]')
    fetchDepartment().then((data) => {
        departments.value = data
        startBuild()
    })
})
function set() {
    setTimeout(() => {
        addeduser.value = false
    }, 2000)
}
const RegistrationDepartment = async () => {
    try {
        const formData = new FormData()
        formData.append('fullname', form.value.fullname.firstname)
        formData.append('department', (form.value.department).toLowerCase())
        formData.append('post', form.value.post)
        formData.append('department_description', form.value.department_description)
        formData.append('department_affiliation', (form.value.department_affiliation.name).toLowerCase())
        formData.append('code', form.value.department_affiliation.code)
        const response = await creadetDepartment(formData)
        condition.value = false
        addeduser.value = true
        set()
        fetchDepartment().then((data) => {
            departments.value = data
            startBuild()
        })
    } catch (e: any) {
        messageCondition.value = e.response.data.message
        condition.value = true
    }
}

const creadetDepartmentForm = () => {
    departments.value = null
    RegistrationDepartment()
}


function buildTree(departments: any) {
    const map: Record<string, TreeNode> = {};
    const tree: TreeNode[] = [];
    departments.forEach((department: { code: any; fullname: string, department: string }) => {
        map[department.code] = {
            key: department.code,
            children: [],
            label: `${department.fullname} (${department.department})`,
            data: department
        };
    });

    departments.forEach((department: { code: any; }) => {
        const { code } = department;
        const parentCode = code.split('-').slice(0, -1).join('-');

        if (parentCode in map) {
            map[parentCode].children.push(map[code]);
        } else {
            tree.push(map[code]);
        }
    });

    return tree;
}
const startBuild = () => {
    departmentTree.value = buildTree(departments.value);
};

</script>
<template>
    <div>
        <div>
            <div class="group_form-control-four">
                <div class="form-control">
                    <label for="jobContactTel" style="color: #fff;">Название отдела</label>
                    <input v-model="form.department" type="text" id="jobContactTel" placeholder="Название отдела" />
                </div>
                <div class="form-control">
                    <label for="participant" style="color: #fff;">Участник</label>
                    <Select v-model="form.fullname" id="Participant" :options="usersString" optionLabel="firstname"
                        placeholder="Участник" class="w-full" />
                </div>
                <div class="form-control">
                    <label for="post" style="color: #fff;">Должность</label>
                    <input v-model="form.post" type="text" id="post" placeholder="Должность" />
                </div>
                <div class="form-control">
                    <label for="participant" style="color: #fff;">Пренадлежность к отделу</label>
                    <Select v-model="form.department_affiliation" id="Participant" :options="existingDepartments"
                        optionLabel="name" placeholder="Пренадлежность к отделу" class="w-full" />
                </div>
            </div>
            <div class="group_form-control">
                <div class="form-control">
                    <label for="department_description" style="color: #fff;">Описание обязаностей</label>
                    <textarea v-model="form.department_description" type="text" id="department_description"
                        placeholder="Описание обязаностей"></textarea>
                </div>
            </div>
            <div class="group_form-control">
                <div>
                    <div v-if="addeduser" class="text-green-600 mb-5">Отдел добавлен!</div>
                    <div v-if="condition" class="text-red-600 mb-5">{{ messageCondition }}</div>
                </div>
                <button class="saveButton" @click="creadetDepartmentForm">Сохранить</button>
            </div>
        </div>
        <div>

            <Tree :value="departmentTree" :expandedKeys="expandedKeys" filterMode="lenient" class="w-full md:w-[100%]">
            </Tree>

            <!-- 
            <h1 style="color: #fff;">
                Тут рисуем древо отделов
                <ul>
                    <li class="department" v-for="item in departments">
                        Имя:
                        <div>{{ item.fullname }}</div>
                        Отдел:
                        <div>{{ item.department }}</div>
                        Описание:
                        <div>{{ item.department_description }}</div>
                    </li>
                </ul>
            </h1> -->
        </div>
    </div>
</template>
<style lang="scss">
.saveButton {
    background: #06a80b;
    min-height: 42px;
    min-width: 280px;
    border-radius: 16px;
    margin-right: 15px;
}

.department {
    padding: 10px;
    margin: 10px;
    background: #3b372669;
    border-radius: 10px;

    div {
        color: #5f645f;
    }
}
</style>