<template>
    <v-container>
        <v-sheet class="pb-5 d-flex justify-center text-h6">
            <div v-if="!exam">Error</div>
            <div v-else-if="!exam.id">New Exam</div>
            <div v-else>Edit Exam</div>
        </v-sheet>

        <v-sheet width="300" class="mx-auto">
            <ExamForm v-if="exam" :exam="exam" @onSubmit="handleSubmit" @onCancel="handleCancel" />
            <p v-else>Invalid exam.</p>
        </v-sheet>
    </v-container>
</template>

<script scoped>
import { MDI_EXAMS } from "@/utils/constants";
import { useExamsStore } from "@/stores/exams";

import ExamForm from "@/components/exam/ExamForm.vue";

export default {
    name: "ExamPage",

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
        initWithDefaultValues() {
            this.exam = {
                id: null,
                name: "",
                maxPoints: 20,
                gradingScale: { A: 91, B: 85, C: 73, D: 50, E: 30, F: 0 }
            };
        },
        handleSubmit(exam) {
            if (!exam.id) {
                this.examsStore.addExam(exam.name, exam.maxPoints, exam.gradingScale);
            } else {
                this.examsStore.updateExam(exam.id, exam.name, exam.maxPoints, exam.gradingScale);
            }
            this.$router.push({ name: "exams-list" });
        },
        handleCancel() {
            this.$router.push({ name: "exams-list" });
        }
    },

    watch: {
        "$route.name": {
            immediate: true,
            handler(name) {
                if (!(name === "exams-add")) return;
                this.initWithDefaultValues();
            }
        },
        "$route.params.id": {
            immediate: true,
            handler(id) {
                if (!id) return;
                this.exam = this.examsStore.getExam(id);
            }
        }
    }
};
</script>
