<template>
    <v-card
        :prepend-icon="MDI_EXAMS"
        elevation="12"
        max-width="300"
        rounded="lg"
        width="100%"
        class="mx-auto pa-2"
    >
        <template v-slot:title>
            <template v-if="!exam"> Error </template>
            <template v-else-if="!exam.id"> Add Exam </template>
            <template v-else> Edit Exam </template>
        </template>

        <v-card-text>
            <ExamForm
                v-if="exam"
                :exam="exam"
                @onSubmit="handleSubmit"
                @onCancel="handleCancel"
            />
            <p v-else>Exam not found.</p>
        </v-card-text>
    </v-card>
</template>

<script scoped>
// Consts
import { MDI_EXAMS } from '@/services/Utils';
// Stores
import { useExamsStore } from '@/stores/ExamsStore';
// Components
import ExamForm from '@/components/exam/ExamForm.vue';

export default {
    name: 'ExamView',

    components: { ExamForm },

    setup() {
        const examsStore = useExamsStore();

        return { MDI_EXAMS, examsStore };
    },

    data() {
        return {
            exam: null
        };
    },

    methods: {
        handleSubmit(exam) {
            if (!exam.id)
                this.examsStore.addExam(exam.name, exam.maxScore, exam.gradingScale);
            else
                this.examsStore.updateExam(
                    exam.id,
                    exam.name,
                    exam.maxScore,
                    exam.gradingScale
                );
            this.$router.push({ name: 'exams-list' });
        },
        handleCancel() {
            this.$router.push({ name: 'exams-list' });
        }
    },

    watch: {
        '$route.name': {
            immediate: true,
            handler(name) {
                if (!(name === 'exams-add')) return;
                this.exam = {
                    id: null,
                    name: '',
                    maxScore: 20,
                    gradingScale: [91, 85, 73, 50, 30, 0]
                };
            }
        },
        '$route.params.id': {
            immediate: true,
            handler(id) {
                if (!id) return;
                this.exam = this.examsStore.getExam(id);
            }
        }
    }
};
</script>
