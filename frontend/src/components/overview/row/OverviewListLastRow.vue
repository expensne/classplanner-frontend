<template>
    <!-- last name -->
    <td></td>
    <!-- first name -->
    <td></td>

    <template v-for="item in averageGrades" :key="item.id">
        <OverviewListRowCell :grade="item.grade" />
    </template>
</template>

<script>
import OverviewListRowDisplayCell from '@/components/overview/row/cell/OverviewListRowDisplayCell.vue';
import { computeAverageGrade } from '@/services/ExamsService';

export default {
    name: 'OverviewListLastRow',

    components: { OverviewListRowCell: OverviewListRowDisplayCell },

    props: {
        exams: {
            type: Array,
            required: true
        }
    },

    computed: {
        averageGrades() {
            let averageGrades = [];
            for (const exam of this.exams) {
                let scores = Object.values(exam.scores);
                let grade = computeAverageGrade(scores, exam.maxScore, exam.gradingScale);

                grade = isNaN(grade) ? '' : grade.toString();

                averageGrades.push({ id: exam.id, grade: grade });
            }
            return averageGrades;
        }
    }
};
</script>
