<template>
    <v-container>
        <v-sheet class="d-flex justify-end">
            <v-btn color="primary" prepend-icon="mdi-plus" @click="addExam">New Exam</v-btn>
        </v-sheet>
        <v-sheet>
            <ExamsList
                v-if="exams?.length > 0"
                :exams="exams"
                @editExam="editExam"
                @deleteExam="showConfirmDialog"
            />
            <div v-else class="text-body-1 d-flex justify-center">There are no exams yet.</div>
        </v-sheet>
    </v-container>

    <ConfirmDialog
        v-model="confirmDialog.show"
        title="Delete Exam"
        :message="confirmDialog.message"
        @onConfirm="deleteExam"
        @onCancel="hideConfirmDialog"
    />
</template>

<script>
import { MDI_EXAMS } from "@/utils/constants";
import { useExamsStore } from "@/stores/exams";

import ExamsList from "@/components/exam/ExamsList.vue";
import ConfirmDialog from "@/components/dialog/ConfirmDialog.vue";

export default {
    name: "ExamsPage",

    components: { ExamsList, ConfirmDialog },

    setup() {
        const examsStore = useExamsStore();

        return { MDI_EXAMS, examsStore };
    },

    data() {
        return {
            confirmDialog: {
                show: false,
                examId: null,
                message: ""
            }
        };
    },

    computed: {
        exams() {
            return this.examsStore.exams;
        }
    },

    methods: {
        editExam(id) {
            this.$router.push({ name: "exams-edit", params: { id: id } });
        },
        showConfirmDialog(examId) {
            const name = this.examsStore.getExamName(examId);
            this.confirmDialog = {
                show: true,
                examId: examId,
                message: "Are you sure you want to delete exam '" + name + "'?"
            };
        },
        hideConfirmDialog() {
            this.confirmDialog = {
                show: false,
                examId: null,
                message: ""
            };
        },
        deleteExam() {
            if (this.confirmDialog.examId) {
                this.examsStore.deleteExam(this.confirmDialog.examId);
            }
            this.hideConfirmDialog();
        },
        addExam() {
            this.$router.push({ name: "exams-add" });
        }
    }
};
</script>
