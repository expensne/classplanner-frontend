<template>
    <v-container class="ma-0">
        <v-sheet>
            <PointsTable
                :studentColumns="this.studentColumns"
                :examColumns="this.examColumns"
                :rows="this.rows"
                @update:newScore="handleScoreChange"
            />
        </v-sheet>
    </v-container>
</template>

<script>
import { useStudentsStore } from "@/stores/students";
import { useExamsStore } from "@/stores/exams";
import { MDI_OVERVIEW } from "@/utils/constants";

import PointsTable from "@/components/table/PointsTable.vue";

export default {
    name: "TablePage",

    components: { PointsTable },

    setup() {
        const studentsStore = useStudentsStore();
        const examsStore = useExamsStore();

        return { MDI_OVERVIEW, studentsStore, examsStore };
    },

    computed: {
        students() {
            return this.studentsStore.students;
        },
        exams() {
            return this.examsStore.exams;
        },

        // Rows for the table
        rows() {
            return this.students.map((student) => {
                const rows = {
                    id: student.id,
                    lastName: student.lastName,
                    firstName: student.firstName
                };

                this.exams.forEach((exam) => {
                    rows[exam.id] = this.getPointsScored(student.scores, exam.id);
                });

                return rows;
            });
        },

        // Columns for the table
        studentColumns() {
            return [
                {
                    id: "lastName",
                    aligh: "left",
                    label: "Last Name",
                    field: (row) => row.lastName
                },
                {
                    id: "firstName",
                    aligh: "left",
                    label: "First Name",
                    field: (row) => row.firstName
                }
            ];
        },
        examColumns() {
            return this.exams.map((exam) => ({
                id: exam.id,
                align: "center",
                label: exam.name + " (" + exam.maxPoints + " P.)",
                field: (row) => row[exam.id],
                minValue: 0,
                maxValue: exam.maxPoints,
                gradingScale: exam.gradingScale
            }));
        }
    },

    methods: {
        getPointsScored(scores, examId) {
            const score = scores[examId] || null;
            return score ? score.pointsScored : null;
        },
        handleScoreChange(studentId, examId, newScore) {
            if (newScore === null) {
                this.studentsStore.deleteScore(studentId, examId);
            } else {
                this.studentsStore.updateStudentScore(studentId, examId, newScore);
            }
        }
    }
};
</script>
