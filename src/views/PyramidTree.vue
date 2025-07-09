<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Tree from 'primevue/tree';
interface Department {
    name: string;
    code: string;
    label: string
    data: string
    icon: string
}

interface TreeNode {
    key: string;
    label: string
    data: string
    icon: string
    children: TreeNode[];
}

const nodes = ref(null);
const test = ref()

const department = ref([
    { name: 'Администрация', code: '0' },

    { name: 'Административный отдел', code: '0-0' },
    { name: 'Финансовый отдел', code: '0-1' },
    { name: 'Маркетинговый отдел', code: '0-2' },
    { name: 'Коммерческий отдел', code: '0-3' },

    { name: 'Отдел кадров', code: '0-0-0' },
    { name: 'Юридический отдел', code: '0-0-1' },
    { name: 'Отдел АХО', code: '0-0-2' },


    { name: 'Бухгалтерия', code: '0-1-0' },

    { name: 'IT отдел', code: '0-2-0' },
    { name: 'Отдел маркетинго', code: '0-2-1' },

    { name: 'Отдел развития', code: '0-3-0' },
    { name: 'Отдел продаж KRAFTER', code: '0-3-1' },
    { name: 'Отдел продаж листовой HPL', code: '0-3-2' },
    { name: 'Отдел продаж KRAFTER Мебель', code: '0-3-3' },
    { name: 'Отдел продаж Атэри', code: '0-3-4' },
    { name: 'Отдел продаж фурнитура', code: '0-3-5' },
    { name: 'Тендерный отдел', code: '0-3-6' },
    { name: 'Сметно-договорной отдел', code: '0-3-7' },
])
const NodeService = ref({
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Учредители (Сухов Даниил Иванович)',
                data: 'Сухов Даниил Иванович',
                icon: 'pi pi-fw pi-mars',
                children: [
                    {
                        key: '0-0',
                        label: 'Технический директор (Кудин Сергей)',
                        data: 'Кудин Сергей',
                        icon: 'pi pi-fw pi-mars',
                        children: [
                            {
                                key: '0-0-0',
                                label: 'Отдел МТО (Попова Ольга)',
                                icon: 'pi pi-fw pi-venus',
                                data: 'Попова Ольга',
                            },
                            {
                                key: '0-0-1',
                                label: 'Отдел МТО (Камолов Хасан)',
                                icon: 'pi pi-fw pi-mars',
                                data: 'Камолов Хасан'
                            }
                        ]
                    },
                    {
                        key: '0-1',
                        label: 'Директор по строительству (Молчанский Кирилл)',
                        data: 'Молчанский Кирилл',
                        icon: 'pi pi-fw pi-home',
                        children: [
                            { key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' },

                        ]
                    }
                ]
            },
            {
                key: '2',
                label: 'Коммерческий директор (Зацепина Регина (ИО))',
                data: 'Зацепина Регина (ИО)',
                icon: 'pi pi-fw pi-mars',
                children: [
                    {
                        key: '2-0',
                        icon: 'pi pi-fw pi-mars',
                        label: 'Отдел продаж Атэри',
                        data: 'Чижиков Роман',
                        children: [
                            { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
                        ]
                    },
                    {
                        key: '2-1',
                        label: 'Отдел продаж KRAFTER Мебель',
                        icon: 'pi pi-fw pi-mars',
                        data: 'Лабода Игорь',
                        children: [
                            { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
                        ]
                    }
                ]
            }
        ];
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
});

function buildTree(departments: any) {
    const map: Record<string, TreeNode> = {};
    const tree: TreeNode[] = [];

    // Создаем карту для быстрого доступа к элементам по их коду
    departments.forEach((department: { code: any; }) => {
        map[department.code] = {
            key: department.code,
            children: [],
            label: 'Учредители (Сухов Даниил Иванович)',
            data: 'Сухов Даниил Иванович',
            icon: 'pi pi-fw pi-mars',
        };
    });

    // Строим древовидную структуру
    departments.forEach((department: { code: any; }) => {
        const { code } = department;
        const parentCode = code.split('-').slice(0, -1).join('-'); // Получаем код родителя

        if (parentCode in map) {
            // Если родитель существует, добавляем текущий элемент в его детей
            map[parentCode].children.push(map[code]);
        } else {
            // Если родителя нет, это корневой элемент
            tree.push(map[code]);
        }
    });

    return tree;
}
const startBuild = () => {
    test.value = buildTree(department.value);
};
// NodeService.getTreeNodes().then(data => nodes.value = data)
onMounted(() => {
    // NodeService.value.getTreeNodes().then(data => nodes.value = data);
    startBuild()
})
</script>
<template>
    <div class="card flex flex-wrap justify-center gap-8">
        <Tree :value="test" :filter="true" filterMode="lenient" class="w-full md:w-[100%]"></Tree>
    </div>
</template>