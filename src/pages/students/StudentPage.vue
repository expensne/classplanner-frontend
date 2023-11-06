<template>
    <v-container>
        <v-sheet class="pb-5 d-flex justify-center text-h6">
            <div v-if="!student">Error</div>
            <div v-else-if="!student.id">New Student</div>
            <div v-else>Edit Student</div>
        </v-sheet>
        <v-sheet width="300" class="mx-auto">
            <StudentForm
                v-if="student"
                :student="student"
                @onSubmit="handleSubmit"
                @onCancel="handleCancel"
            />
            <p v-else>Invalid student.</p>
        </v-sheet>
    </v-container>
</template>

<script scoped>
import { MDI_STUDENTS } from "@/utils/constants";
import { useStudentsStore } from "@/stores/students";

import StudentForm from "@/components/student/StudentForm.vue";

export default {
    name: "StudentPage",

    components: { StudentForm },

    setup() {
        const studentsStore = useStudentsStore();

        return { studentsStore, MDI_STUDENTS };
    },

    data() {
        return {
            student: null
        };
    },

    methods: {
        handleSubmit(student) {
            if (!student.id) {
                this.studentsStore.addStudent(student.firstName, student.lastName);
            } else {
                this.studentsStore.updateStudent(student.id, student.firstName, student.lastName);
            }
            this.$router.push({ name: "students-list" });
        },
        handleCancel() {
            this.$router.push({ name: "students-list" });
        }
    },

    watch: {
        "$route.name": {
            immediate: true,
            handler(name) {
                if (!(name === "students-add")) return;
                this.student = {
                    id: null,
                    firstName: "",
                    lastName: ""
                };
            }
        },
        "$route.params.id": {
            immediate: true,
            handler(id) {
                if (!id) return;
                this.student = this.studentsStore.getStudent(id);
            }
        }
    }
};
</script>
