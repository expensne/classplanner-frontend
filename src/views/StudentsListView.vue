<template>
    <v-card
        :prepend-icon="MDI_STUDENTS"
        elevation="12"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 mx-auto"
    >
        <template v-slot:title>
            <div class="d-flex">
                <p class="me-auto">Students</p>
                <v-btn color="success" prepend-icon="mdi-plus" @click="handleAdd"
                    >Add Student</v-btn
                >
            </div>
        </template>

        <v-card-text class="text-center">
            <StudentsList
                v-if="students?.length > 0"
                :students="students"
                @editStudent="handleEdit"
                @deleteStudent="handleDelete"
            />

            <div v-else class="text-body-1 pa-4">There are no students yet.</div>

            <v-divider class="mb-4"></v-divider>
        </v-card-text>
    </v-card>
</template>

<script>
// Consts
import { MDI_STUDENTS } from '@/services/Utils';
// Stores
import { useStudentsStore } from '@/stores/StudentsStore';
// Components
import StudentsList from '@/components/student/StudentsList.vue';

export default {
    name: 'StudentsListView',

    components: { StudentsList },

    setup() {
        const studentsStore = useStudentsStore();

        return { MDI_STUDENTS, studentsStore };
    },

    computed: {
        students() {
            return this.studentsStore.students;
        }
    },

    methods: {
        handleEdit(id) {
            this.$router.push({ name: 'students-edit', params: { id: id } });
        },
        handleDelete(id) {
            this.studentsStore.deleteStudent(id);
        },
        handleAdd() {
            this.$router.push({ name: 'students-add' });
        }
    }
};
</script>
