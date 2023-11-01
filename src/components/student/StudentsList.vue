<template>
    <v-table>
        <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <StudentsListRow
                v-for="item in students"
                :key="item.id"
                :id="item.id"
                :firstName="item.firstName"
                :lastName="item.lastName"
                @editClicked="handleEdit"
                @deleteClicked="handleDelete"
                class="text-left"
            />
        </tbody>
    </v-table>
</template>

<script>
import StudentsListRow from '@/components/student/StudentsListRow.vue';

export default {
    name: 'StudentsList',

    props: {
        students: {
            type: Array,
            required: true
        }
    },

    emits: ['editStudent', 'deleteStudent'],

    components: { StudentsListRow },

    methods: {
        handleEdit(id) {
            this.$emit('editStudent', id);
        },
        handleDelete(id) {
            this.$emit('deleteStudent', id);
        }
    }
};
</script>
