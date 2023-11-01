<template>
    <v-card
        :prepend-icon="MDI_OVERVIEW"
        elevation="12"
        max-width="90%"
        rounded="lg"
        class="pa-4 mx-auto"
    >
        <template v-slot:title> Overview </template>

        <OverviewList
            :students="students"
            :exams="exams"
            @onScoreChange="handleScoreChange"
        />
    </v-card>
</template>

<script>
// Consts
import { MDI_OVERVIEW } from '@/services/Utils';
// Stores
import { useStudentsStore } from '@/stores/StudentsStore';
import { useExamsStore } from '@/stores/ExamsStore';
// Components
import OverviewList from '@/components/overview/OverviewList.vue';

export default {
    name: 'HomeView',

    components: { OverviewList },

    setup() {
        const studentsStore = useStudentsStore();
        const examsStore = useExamsStore();

        return { MDI_OVERVIEW, studentsStore, examsStore };
    },

    computed: {
        students() {
            return this.studentsStore.students;
        },
        exams() {
            return this.examsStore.exams;
        }
    },

    methods: {
        handleScoreChange(scoreId, scoreValue, isPostscript, examId, studentId) {
            if (scoreId === null && scoreValue === null) return;

            if (scoreId === null) {
                this.examsStore.addScore(examId, studentId, scoreValue);
            } else if (scoreValue === null) {
                this.examsStore.deleteScore(scoreId, examId, studentId);
            } else {
                this.examsStore.updateScore(
                    scoreId,
                    examId,
                    studentId,
                    scoreValue,
                    isPostscript
                );
            }
        }
    }
};
</script>
