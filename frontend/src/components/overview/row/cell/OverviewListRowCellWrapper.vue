<template>
    <OverviewListRowEditableCell
        v-model:score="editableScoreValue"
        v-model:isRewrite="editableIsPostscript"
        :percentage="percentage"
        :grade="grade"
        :validationRule="isValidScore"
    />
</template>

<script>
import OverviewListRowEditableCell from '@/components/overview/row/cell/OverviewListRowEditableCell.vue';
import { computeGrade, computePercentage } from '@/services/ExamsService';

export default {
    name: 'OverviewListRowCellWrapper',

    components: { OverviewListRowEditableCell },

    props: {
        scoreId: {
            type: [String, null],
            required: true
        },
        scoreValue: {
            type: [Number, null],
            required: true
        },
        isPostscript: {
            type: [Boolean, null],
            required: true
        },
        maxScore: {
            type: Number,
            required: true
        },
        gradingScale: {
            type: Array,
            required: true
        },
        examId: {
            type: String,
            required: true
        }
    },

    emits: ['onScoreChange'],

    data() {
        return {
            editableScoreValue: null,
            editableIsPostscript: null
        };
    },

    created() {
        if (this.scoreValue === undefined) throw new Error('scoreValue must be defined');
        if (this.isPostscript === undefined) throw new Error('isPostscript must be defined');

        // Ensure its a string from now on
        this.editableScoreValue = this.scoreValue === null ? '' : this.scoreValue.toString();
        this.editableIsPostscript = this.isPostscript;
    },

    computed: {
        percentage() {
            let score = this.editableScoreValue;
            if (!this.isValidScore(score, false)) return '';
            return computePercentage(score, this.maxScore).toString();
        },
        grade() {
            let score = this.editableScoreValue;
            if (!this.isValidScore(score, false)) return '';
            return computeGrade(score, this.maxScore, this.gradingScale).toString();
        }
    },

    methods: {
        isValidScore(score, allowEmpty = true) {
            // Allow empty score = exam not taken
            if (score === '') return allowEmpty;

            // Score must be a number between 0 and maxScore
            score = Number(score);
            if (isNaN(score) || score < 0 || score > this.maxScore) return false;

            return true;
        },
        handleScoreChange() {
            let scoreValue = this.editableScoreValue;

            if (!this.isValidScore(this.editableScoreValue)) return;
            // Return the score as a number, since we got it as a number
            // or null if it was empty
            scoreValue = scoreValue === '' ? null : Number(scoreValue);

            this.$emit(
                'onScoreChange',
                this.scoreId,
                scoreValue,
                this.editableIsPostscript,
                this.examId
            );
        }
    },

    watch: {
        editableScoreValue() {
            this.handleScoreChange();
        },
        editableIsPostscript() {
            this.handleScoreChange();
        }
    }
};
</script>

<style scoped>
table tr td:nth-child(3n) {
    border-left: 1px solid #ffffff35;
}

.value-td {
    table-layout: fixed;
    word-wrap: break-word;
    width: 3rem;
}
</style>
