<template>
    <MainLayout>
        <router-view></router-view>
    </MainLayout>
</template>

<script>
import { useStudentsStore } from "@/stores/students";
import { useExamsStore } from "@/stores/exams";

import MainLayout from "@/layouts/MainLayout.vue";

export default {
    name: "App",

    setup() {
        const studentsStore = useStudentsStore();
        const examsStore = useExamsStore();

        studentsStore.fetchStudents();
        examsStore.fetchExams();
    },
    components: { MainLayout }
};
</script>
