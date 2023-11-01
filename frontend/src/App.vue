<template>
    <BaseNavbar />
    <router-view />
</template>

<script>
import { useStudentsStore } from '@/stores/StudentsStore';
import { useExamsStore } from '@/stores/ExamsStore';

import BaseNavbar from '@/components/BaseNavbar.vue';

export default {
    name: 'App',
    setup() {
        const studentsStore = useStudentsStore();
        const examsStore = useExamsStore();

        studentsStore.fetchStudents();
        examsStore.fetchExams();
    },
    components: { BaseNavbar }
};
</script>
