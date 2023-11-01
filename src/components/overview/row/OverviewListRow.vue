<template>
    <tr class="hover-bg">
        <td>{{ lastName }}</td>
        <td>{{ firstName }}</td>

        <template v-for="result in results" :key="result.id">
            <OverviewListRowCellWrapper
                :scoreId="result.scoreId"
                :scoreValue="result.scoreValue"
                :isPostscript="result.isPostscript"
                :max-score="result.maxScore"
                :grading-scale="result.gradingScale"
                :exam-id="result.examId"
                @onScoreChange="handleScoreChange"
            />
        </template>
    </tr>
</template>

<script>
import OverviewListRowCellWrapper from '@/components/overview/row/cell/OverviewListRowCellWrapper.vue';

export default {
    name: 'OverviewListRow',

    components: { OverviewListRowCellWrapper },

    emits: ['onScoreChange'],

    props: {
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        studentId: {
            type: String,
            required: true
        },
        results: {
            type: Array,
            required: true
        }
    },

    methods: {
        handleScoreChange(scoreId, scoreValue, isPostscript, examId) {
            // Bubble up the event; append the studentId
            this.$emit('onScoreChange', scoreId, scoreValue, isPostscript, examId, this.studentId);
        }
    }
};
</script>

<style scoped>
.hover-bg:hover {
    /* `!important` is necessary here because Vuetify overrides this */
    background: rgba(0, 0, 0, 0.2) !important;
}
</style>
