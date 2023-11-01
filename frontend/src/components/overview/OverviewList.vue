<template>
    <v-table fixed-header density="compact">
        <thead>
            <tr>
                <th class="text-left align-bottom pb-4">Last Name</th>
                <th class="text-left align-bottom pb-4">First Name</th>
                <th
                    class="text-right align-bottom pb-4"
                    v-for="exam in exams"
                    :key="exam.id"
                    colspan="3"
                >
                    <p>
                        {{ exam.name }}
                    </p>
                    <p class="font-weight-bold pt-4 text-high-emphasis">
                        {{ exam.maxScore }}pts
                    </p>
                </th>
            </tr>
        </thead>

        <tbody>
            <OverviewListRow
                v-for="student in students"
                :key="student.id"
                :lastName="student.lastName"
                :firstName="student.firstName"
                :student-id="student.id"
                :results="resultsFor(student)"
                @onScoreChange="handleScoreChange"
            />

            <OverviewListLastRow :exams="exams" />
        </tbody>
    </v-table>
</template>

<script>
import OverviewListRow from '@/components/overview/row/OverviewListRow.vue';
import OverviewListLastRow from '@/components/overview/row/OverviewListLastRow.vue';

export default {
    name: 'OverviewList',

    components: { OverviewListRow, OverviewListLastRow },

    emits: ['onScoreChange'],

    props: {
        students: {
            type: Array,
            required: true
        },
        exams: {
            type: Array,
            required: true
        }
    },

    methods: {
        resultsFor(student) {
            let results = [];
            for (const exam of this.exams) {
                const scoreIndex = exam.scores.findIndex(
                    (score) => score.studentId === student.id
                );

                // Get score if it exists, otherwise null
                const score = scoreIndex === -1 ? null : exam.scores[scoreIndex];

                let scoreId;
                let scoreValue;
                let isPostscript;

                // If score does not exist, set default values
                if (score === null) {
                    scoreId = null;
                    scoreValue = null;
                    isPostscript = false;
                }
                // If score exists, set correct values
                else {
                    scoreId = score.id;
                    scoreValue = score.value;
                    isPostscript = score.isPostscript;
                }

                results.push({
                    examId: exam.id,
                    scoreId: scoreId,
                    scoreValue: scoreValue,
                    isPostscript: isPostscript,
                    maxScore: exam.maxScore,
                    gradingScale: exam.gradingScale
                });
            }

            return results;
        },
        handleScoreChange(scoreId, scoreValue, isPostscript, examId, studentId) {
            // Bubble up the event
            this.$emit(
                'onScoreChange',
                scoreId,
                scoreValue,
                isPostscript,
                examId,
                studentId
            );
        }
    }
};
</script>

<style scoped>
th.align-bottom {
    vertical-align: bottom;
}
</style>

// https://vuetifyjs.com/en/components/data-tables/basics/#item
