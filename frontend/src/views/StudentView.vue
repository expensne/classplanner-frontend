<template>
    <v-card
        :prepend-icon="MDI_STUDENTS"
        elevation="12"
        max-width="300"
        rounded="lg"
        width="100%"
        class="mx-auto pa-2"
    >
        <template v-slot:title>
            <template v-if="!student"> Error </template>
            <template v-else-if="!student.id"> Add Student </template>
            <template v-else> Edit Student </template>
        </template>

        <v-card-text>
            <StudentForm
                v-if="student"
                :student="student"
                @onSubmit="handleSubmit"
                @onCancel="handleCancel"
            />
            <p v-else>Student not found.</p>
        </v-card-text>
    </v-card>
</template>

<script scoped>
// Consts
import { MDI_STUDENTS } from '@/services/Utils';
// Stores
import { useStudentsStore } from '@/stores/StudentsStore';
// Components
import StudentForm from '@/components/student/StudentForm.vue';

export default {
    name: 'StudentView',

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
            if (!student.id)
                this.studentsStore.addStudent(student.firstName, student.lastName);
            else
                this.studentsStore.updateStudent(
                    student.id,
                    student.firstName,
                    student.lastName
                );
            this.$router.push({ name: 'students-list' });
        },
        handleCancel() {
            this.$router.push({ name: 'students-list' });
        }
    },

    watch: {
        '$route.name': {
            immediate: true,
            handler(name) {
                if (!(name === 'students-add')) return;
                this.student = {
                    id: null,
                    firstName: '',
                    lastName: ''
                };
            }
        },
        '$route.params.id': {
            immediate: true,
            handler(id) {
                if (!id) return;
                this.student = this.studentsStore.getStudent(id);
            }
        }
    }
};
</script>
