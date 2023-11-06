<template>
    <v-container>
        <v-sheet class="d-flex justify-end">
            <v-btn color="primary" prepend-icon="mdi-plus" @click="addStudent">New Student</v-btn>
        </v-sheet>
        <v-sheet>
            <StudentsList
                v-if="students?.length > 0"
                :students="students"
                @editStudent="editStudent"
                @deleteStudent="showConfirmDialog"
            />
            <div v-else class="text-body-1 d-flex justify-center">There are no students yet.</div>
        </v-sheet>
    </v-container>

    <ConfirmDialog
        v-model="confirmDialog.show"
        title="Delete Student"
        :message="confirmDialog.message"
        @onConfirm="deleteStudent"
        @onCancel="hideConfirmDialog"
    />
</template>

<script>
import { MDI_STUDENTS } from "@/utils/constants";
import { useStudentsStore } from "@/stores/students";

import StudentsList from "@/components/student/StudentsList.vue";
import ConfirmDialog from "@/components/dialog/ConfirmDialog.vue";

export default {
    name: "StudentsPage",

    components: { StudentsList, ConfirmDialog },

    setup() {
        const studentsStore = useStudentsStore();

        return { MDI_STUDENTS, studentsStore };
    },

    data() {
        return {
            confirmDialog: {
                show: false,
                studentId: null,
                message: ""
            }
        };
    },

    computed: {
        students() {
            return this.studentsStore.students;
        }
    },

    methods: {
        editStudent(id) {
            this.$router.push({ name: "students-edit", params: { id: id } });
        },
        showConfirmDialog(studentId) {
            const name = this.studentsStore.getStudentName(studentId);
            this.confirmDialog = {
                show: true,
                studentId: studentId,
                message: "Are you sure you want to delete student '" + name + "'?"
            };
        },
        hideConfirmDialog() {
            this.confirmDialog = {
                show: false,
                studentId: null,
                message: ""
            };
        },
        deleteStudent() {
            if (this.confirmDialog.studentId) {
                this.studentsStore.deleteStudent(this.confirmDialog.studentId);
            }
            this.hideConfirmDialog();
        },
        addStudent() {
            this.$router.push({ name: "students-add" });
        }
    }
};
</script>
