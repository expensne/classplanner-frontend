<template>
    <v-table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Max Points</th>
                <th>Grading Scale (%)</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <ExamsListRow
                v-for="item in exams"
                :key="item.id"
                :id="item.id"
                :name="item.name"
                :maxPoints="item.maxPoints"
                :gradingScale="item.gradingScale"
                @editClicked="handleEdit"
                @deleteClicked="handleDelete"
                class="text-left"
            />
        </tbody>
    </v-table>
</template>

<script>
import ExamsListRow from '@/components/exam/ExamsListRow.vue';

export default {
    name: 'ExamsList',

    props: {
        exams: {
            type: Array,
            required: true
        }
    },

    emits: ['editExam', 'deleteExam'],

    components: { ExamsListRow },

    methods: {
        handleEdit(id) {
            this.$emit('editExam', id);
        },
        handleDelete(id) {
            this.$emit('deleteExam', id);
        }
    }
};
</script>
