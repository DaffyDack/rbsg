<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Select from 'primevue/select'
import MultiSelect from 'primevue/multiselect';
import Tree from 'primevue/tree';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';


import { creadetDepartment, deleteDepartmentsByCode, fetchDepartment } from '../http/userAPI.js'

const usersString = ref()
const departments = ref()
const departmentTree = ref()
const visible = ref(false);
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
    participants: any
    code: string
}
interface Item {
    department: string;
    code: string;
}
interface name {
    firstname: string;
}
const ThereIsAlreadyDepartmentVisible = ref<boolean>(false)
const selectedName = ref<name[]>([]);
const form = ref<Form>({
    fullname: '',
    department: '',
    post: '',
    department_description: '',
    department_affiliation: '',
    participants: '',
    code: '',
})
const messageCondition = ref<string>('')
const condition = ref<boolean>(false)
const addeduser = ref<boolean>(false)
const visibleDeleteDepartment = ref<boolean>(false);
const editDepartmentVisible = ref<boolean>(false);
const departmentInfo = ref<boolean>(false)
const editedDepartment = ref<string>('')
const relatedToDepartment = ref<boolean>(false)
const existingDepartments = ref<Item[]>([]);

const codeFromDelete = ref<string>('')
const departmentFromDelete = ref<string>('')


const selectedDepartment = (e: any) => {
    departmentInfo.value = e.data.department_description
    relatedToDepartment.value = e.data.participants
    visible.value = true
}
const selectedDeleteDepartment = (e: any) => {
    console.log(e.data.code, e.data.id, 'Нам анужно найти ID')
    codeFromDelete.value = e.data.code
    departmentFromDelete.value = e.data.department
    visibleDeleteDepartment.value = true
}

const selectedEditDepartment = async (e: any) => {
    editedDepartment.value = e.data.department
    editDepartmentVisible.value = true
}

function getUniqueItems(arr: Item[]): Item[] {
    const uniqueItemsMap = new Map<string, Item>();
    arr.forEach(item => {
        if (!uniqueItemsMap.has(item.department)) {
            uniqueItemsMap.set(item.department, item);
        }
    });

    return Array.from(uniqueItemsMap.values());
}



onMounted(() => {
    usersString.value = JSON.parse(localStorage.getItem('users') ?? '[]')
    fetchDepartment().then((data) => {
        departments.value = data
        startBuild()
        existingDepartments.value = getUniqueItems(departments.value);
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
        formData.append('fullname', `${form.value.fullname.firstname} ${form.value.fullname.lastname} ${form.value.fullname.patronymic}`)
        formData.append('department', (form.value.department).toLowerCase())
        formData.append('post', form.value.post)
        formData.append('department_description', form.value.department_description)
        formData.append('department_affiliation', form.value.department_affiliation == '' ? 'администрация' : (form.value.department_affiliation.department).toLowerCase())
        formData.append('code', form.value.department_affiliation == '' ? '0-0' : form.value.department_affiliation.code)
        formData.append('participants', form.value.participants)
        const response = await creadetDepartment(formData)
        if (response['name'] !== undefined) {
            ThereIsAlreadyDepartmentVisible.value = true
        } else {
            console.log(response, 'че в ответе')
            condition.value = false
            addeduser.value = true
            set()
            fetchDepartment().then((data) => {
                departments.value = data
                startBuild()
                existingDepartments.value = getUniqueItems(departments.value);
                Object.keys(form.value).forEach(key => {
                    // @ts-ignore
                    form.value[key] = '';
                });
                selectedName.value = []
            })
        }
    } catch (e: any) {
        messageCondition.value = e.response.data.message
        condition.value = true
    }
}

const creadetDepartmentForm = () => {
    departments.value = null
    RegistrationDepartment()
}
const deleteDepartmentForm = async () => {
    try {
        const formData = new FormData()
        formData.append('codeDelete', codeFromDelete.value)
        const response = await deleteDepartmentsByCode(formData)
        console.log(response, 'после удаления')
        visibleDeleteDepartment.value = false
        fetchDepartment().then((data) => {
            departments.value = data
            startBuild()
            existingDepartments.value = getUniqueItems(departments.value);
        })
    } catch (error) {
        console.log('что то с удалением', error)
    }
}


function buildTree(departments: any) {
    const map: Record<string, TreeNode> = {};
    const tree: TreeNode[] = [];
    departments.forEach((department: { code: any; fullname: string, department: string }) => {
        map[department.code] = {
            key: department.code,
            children: [],
            label: `${department.department} (${department.fullname}) `,
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
function getNamesAsString(): void {
    form.value.participants = selectedName.value.map(item => item.firstname).join(', ');
}
</script>
<template>
    <div>
        <div>
            <div class="group_form-control-five">
                <div class="form-control">
                    <label for="jobContactTel" style="color: #fff;">Название отдела</label>
                    <input v-model="form.department" type="text" id="jobContactTel" placeholder="Название отдела" />
                </div>
                <div class="form-control">
                    <label for="participant1" style="color: #fff;">Руководитель</label>
                    <Select v-model="form.fullname" id="Participant" :options="usersString" optionLabel="firstname"
                        placeholder="Руководитель" class="w-full" />
                </div>
                <div class="form-control">
                    <label for="post" style="color: #fff;">Должность</label>
                    <input v-model="form.post" type="text" id="post" placeholder="Должность" />
                </div>
                <div class="form-control">
                    <label for="participants" style="color: #fff;">Участники</label>
                    <MultiSelect v-model="selectedName" @change="getNamesAsString()" id="participants"
                        :options="usersString" optionLabel="firstname" filter placeholder="Участник"
                        :maxSelectedLabels="3" class="w-full md:w-80" />
                </div>
                <div class="form-control">
                    <label for="participant" style="color: #fff;">Пренадлежность к отделу</label>
                    <Select v-model="form.department_affiliation" id="Participant" :options="existingDepartments"
                        optionLabel="department" placeholder="Пренадлежность к отделу" class="w-full" />
                </div>
            </div>
            <div class="group_form-control">
                <div class="form-control">
                    <label for="department_description" style="color: #fff;">Описание обязаностей</label>
                    <textarea v-model="form.department_description" type="text" id="department_description"
                        placeholder="Описание обязаностей"></textarea>
                </div>
            </div>
            <div class="group_form-control mb-5">
                <div>
                    <div v-if="addeduser" class="text-green-600 mb-5">Отдел добавлен!</div>
                    <div v-if="condition" class="text-red-600 mb-5">{{ messageCondition }}</div>
                </div>
                <button class="saveButton" @click="creadetDepartmentForm">Сохранить</button>
            </div>
        </div>
        <div>
            <Tree :value="departmentTree" :expandedKeys="expandedKeys" filterMode="lenient"
                class="w-full md:w-[100%] tereeSpecial">
                <template #default="slotProps" class="w-full md:w-[100%]">
                    <div class="wrapperSlotProps">
                        <b @click="selectedDepartment(slotProps.node)">{{ slotProps.node.label }}</b>
                        <div>
                            <Button class="mr-3" icon="pi pi-pencil" severity="warn" aria-label="Notification"
                                @click="selectedEditDepartment(slotProps.node)" />
                            <Button icon="pi pi-times" severity="danger" aria-label="Cancel"
                                @click="selectedDeleteDepartment(slotProps.node)" />
                        </div>

                    </div>
                </template>
            </Tree>
            <Dialog v-model:visible="visible" modal header="Описание обязаностей" :style="{ width: '80%' }">
                <div>Кто в отделе: {{ relatedToDepartment }}</div>
                <div>{{ departmentInfo }}</div>
            </Dialog>
        </div>
        <Dialog v-model:visible="ThereIsAlreadyDepartmentVisible" modal header="Повторение отдела"
            :style="{ width: '80%' }">
            <div>Такой отдел уже есть!!!</div>
        </Dialog>
        <Dialog v-model:visible="visibleDeleteDepartment" modal header="Удаление отдела" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Вы хотите удалить
                отдел {{ departmentFromDelete }} ?</span>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Отмена" severity="secondary"
                    @click="visibleDeleteDepartment = false"></Button>
                <Button type="button" label="Удалить" @click="deleteDepartmentForm"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="editDepartmentVisible" modal :header="`Редактирование отдела: ${editedDepartment}`"
            :style="{ width: '80%' }">
            <div class="group_form-control-one">
                <div class="form-control">
                    <label for="participants1" style="color: #000;">Участники</label>
                    <MultiSelect v-model="selectedName" @change="getNamesAsString()" id="participants1"
                        :options="usersString" optionLabel="firstname" filter placeholder="Участник"
                        :maxSelectedLabels="3" class="w-full md:w-[100%]" />
                </div>
            </div>
            <div class="group_form-control">
                <div class="form-control">
                    <label for="department_description" style="color: #000;">Описание обязаностей</label>
                    <textarea v-model="form.department_description" style="border: 1px solid #ccc;" type="text"
                        id="department_description" placeholder="Описание обязаностей"></textarea>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<style lang="scss">
.tereeSpecial {
    .p-tree-node-label {
        width: 100%;

        .wrapperSlotProps {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 5px;
            border: 1px solid #ccc;
        }
    }
}

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