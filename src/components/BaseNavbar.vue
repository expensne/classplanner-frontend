<template>
    <v-toolbar title="Classbook" density="compact" class="mb-5">
        <v-btn @click="onOverviewClicked" :prepend-icon="MDI_OVERVIEW"> Overview</v-btn>
        <v-btn @click="onStudentsClicked" :prepend-icon="MDI_STUDENTS">Students</v-btn>
        <v-btn @click="onExamsClicked" :prepend-icon="MDI_EXAMS">Exams</v-btn>
    </v-toolbar>
</template>

<script>
import { MDI_OVERVIEW, MDI_EXAMS, MDI_STUDENTS } from '@/services/Utils';

export default {
    name: 'BaseNavbar',

    setup() {
        return { MDI_OVERVIEW, MDI_EXAMS, MDI_STUDENTS };
    },

    methods: {
        onOverviewClicked() {
            this.$router.push({ name: 'home' });
        },
        onStudentsClicked() {
            this.$router.push({ name: 'students-list' });
        },
        onExamsClicked() {
            this.$router.push({ name: 'exams-list' });
        }
    }
};
</script>
