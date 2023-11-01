<template>
    <v-card
        :prepend-icon="MDI_EXAMS"
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 mx-auto"
    >
        <template v-slot:title>
            <div class="d-flex">
                <p class="me-auto">Exams</p>
                <v-btn color="success" prepend-icon="mdi-plus" @click="handleAdd">
                    Add Exam</v-btn
                >
            </div>
        </template>

        <v-card-text class="text-center">
            <ExamsList
                v-if="exams?.length > 0"
                :exams="exams"
                @editExam="handleEdit"
                @deleteExam="handleDelete"
            />

            <div v-else class="text-body-1 pa-4">There are no exams yet.</div>

            <v-divider class="mb-4"></v-divider>
        </v-card-text>
    </v-card>
</template>

<script>
// Consts
import { MDI_EXAMS } from '@/services/Utils';
// Stores
import { useExamsStore } from '@/stores/ExamsStore';
// Components
import ExamsList from '@/components/exam/ExamsList.vue';

export default {
    name: 'ExamsListView',

    components: { ExamsList },

    setup() {
        const examsStore = useExamsStore();
        return { MDI_EXAMS, examsStore };
    },

    computed: {
        exams() {
            return this.examsStore.exams;
        }
    },

    methods: {
        handleEdit(id) {
            this.$router.push({ name: 'exams-edit', params: { id: id } });
        },
        handleDelete(id) {
            this.examsStore.deleteExam(id);
        },
        handleAdd() {
            this.$router.push({ name: 'exams-add' });
        }
    }
};
</script>
