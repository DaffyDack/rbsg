<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import Tree from 'primevue/tree';
import { useUsersStore } from '../stores/users'
import treeUsers from '../utils/department.json'
const imgW = ref({
    imgUrl: import.meta.env.VITE_API_URL,
})
import Dialog from 'primevue/dialog';
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'

const store = useUsersStore()
const visible = ref(false);
const userInfo = ref<userInfo>({
    firstname: '',
    lastname: '',
    patronymic: '',
    email: '',
    datebirth: '',
    mobilephone: '',
    gender: '',
    password: '',
    role: '',
    img: '',
    workphone: '',
    positions: '',
    department: '',
    locations: '',
    code: '',
})
const usersString = localStorage.getItem('users') ?? '[]';
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

onMounted(() => {
    startBuild()
})

interface TreeNode {
    key: string;
    label: string
    data: object
    // icon: string
    children: TreeNode[];
}
interface userInfo {
    firstname?: string
    lastname?: string
    company?: string
    patronymic?: string
    email?: string
    datebirth?: string
    mobilephone?: string
    gender?: string
    password?: string
    role?: string
    img?: string
    workphone?: string
    positions?: string
    department?: string
    locations?: string
    jobfunctions?: string
    code?: string
}

const users = ref()




function buildTree(departments: any) {
    const map: Record<string, TreeNode> = {};
    const tree: TreeNode[] = [];
    departments.forEach((department: { code: any; email: any, firstname: string, lastname: string, gender: string }) => {
        map[department.code] = {
            key: department.code,
            children: [],
            label: `${department.firstname}`,
            data: department,
            // icon: `pi pi-fw pi-${department.gender === "М" ? 'mars' : 'venus'}`,
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
    users.value = buildTree(treeUsers);
};
const selectUser = (e: any) => {
    userInfo.value.firstname = e.data.firstname
    userInfo.value.lastname = e.data.lastname
    userInfo.value.patronymic = e.data.patronymic
    userInfo.value.email = e.data.email
    userInfo.value.mobilephone = e.data.mobilephone
    userInfo.value.workphone = e.data.workphone
    userInfo.value.gender = e.data.gender
    userInfo.value.datebirth = e.data.datebirth
    userInfo.value.role = e.data.role
    userInfo.value.img = e.data.img
    userInfo.value.locations = e.data.locations
    userInfo.value.department = e.data.department
    userInfo.value.company = e.data.company
    userInfo.value.positions = e.data.positions
    userInfo.value.jobfunctions = e.data.jobfunctions
    visible.value = true
}

console.log(store.user, 'pyramid tree', JSON.parse(localStorage.getItem('users') ?? '[]'))
</script>
<template>
 
    <div class="card flex flex-wrap justify-center gap-8 newTree">
        <Tree :value="users" :expandedKeys="expandedKeys" :filter="true" filterMode="lenient"
            class="w-full md:w-[100%]">
            <template #default="slotProps">
                <b @click="selectUser(slotProps.node)">{{ slotProps.node.label }}</b>
            </template>
        </Tree>
        <Dialog v-model:visible="visible" modal header="Профиль сотрудника" :style="{ width: '80%' }">
            <div class="flex">
                <div>
                    <div class="img" :style="{ backgroundImage: 'url(' + imgW.imgUrl + '/' + userInfo.img + ')' }">
                    </div>
                </div>
                <div>
                    <div class="flex items-center mb-4">
                        <label for="username" class="font-semibold" :style="{ minWidth: '11.5rem' }">Имя</label>
                        <div id="username" class="flex-auto">{{ userInfo.firstname }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="email" class="font-semibold" :style="{ minWidth: '11.5rem' }">Email</label>
                        <div id="email" class="flex-auto">{{ userInfo.email }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="department" class="font-semibold" :style="{ minWidth: '11.5rem' }">Отдел</label>
                        <div id="department" class="flex-auto">{{ userInfo.department }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="company" class="font-semibold" :style="{ minWidth: '11.5rem' }">Компания</label>
                        <div id="company" class="flex-auto">{{ userInfo.company }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="positions" class="font-semibold" :style="{ minWidth: '11.5rem' }">Должность</label>
                        <div id="positions" class="flex-auto">{{ userInfo.positions }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="mobile" class="font-semibold" :style="{ minWidth: '11.5rem' }">Мобильный</label>
                        <div id="mobile" class="flex-auto">{{ userInfo.mobilephone }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="mobileWork" class="font-semibold" :style="{ minWidth: '11.5rem' }">Мобильный
                            (рабочий)</label>
                        <div id="mobileWork" class="flex-auto">{{ userInfo.workphone }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="datebirth" class="font-semibold" :style="{ minWidth: '11.5rem' }">Дата
                            рождения</label>
                        <div id="datebirth" class="flex-auto">{{ userInfo.datebirth }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="locations" class="font-semibold" :style="{ minWidth: '11.5rem' }">Рабочее
                            место</label>
                        <div id="locations" class="flex-auto">{{ userInfo.locations }}</div>
                    </div>
                    <div class="flex items-center mb-8">
                        <label for="jobfunctions" class="font-semibold" :style="{ minWidth: '11.5rem' }"> Долж.
                            Обяз.</label>
                        <div id="jobfunctions" class="flex-auto">{{ userInfo.jobfunctions }}</div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<style lang="scss">
.card {
    .p-tree {
        padding: 28px;
        border-radius: 36px;
        background:linear-gradient(0deg, rgba(0, 0, 0, 0.00) 70%, rgba(0, 138, 251, 0.10) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.00) 70%, rgba(0, 138, 251, 0.10) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.00) 70%, rgba(0, 138, 251, 0.10) 100%), linear-gradient(270deg, rgba(0, 0, 0, 0.00) 70%, rgba(0, 138, 251, 0.10) 100%), rgba(0, 0, 0, 0.01);
        backdrop-filter: blur(22.049999237060547px);
      
     
    }

   .p-iconfield .p-tree-filter {
    border-radius: 50%;
    
   }
   .p-tree-filter-input {
    border: none;
    border-radius: 36px;
    background: rgba(130, 159, 255, 0.20);
   }
   .p-iconfield .p-inputicon:last-child {
    position: absolute;
    left: 20px;
    color:#FFF;
   }
   .p-iconfield .p-tree-filter {
   position: relative;

   }
   .p-tree-node-content{
     color: rgba(255, 255, 255, 1);
    font-family: Manrope;
    font-size: 16px;;
   }
   .p-tree-node-toggle-button {
    width: 30px;
    height: 30px;
    border: solid 1px;
    color:rgba(255, 255, 255, 1)
   }
   .p-tree-node-icon {
    padding-left: 36px;
   }
}
    

</style>


<style lang="scss" scoped>
.img {
    max-width: 200px;
    max-height: 200px;
    min-width: 200px;
    min-height: 200px;
    overflow: hidden;
    margin-right: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>