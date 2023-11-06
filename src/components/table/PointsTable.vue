<template>
    <v-table fixed-header>
        <thead>
            <tr>
                <th
                    v-for="column in studentColumns"
                    :key="column.id"
                    :class="`text-` + column.align"
                >
                    {{ column.label }}
                </th>

                <th v-for="column in examColumns" :key="column.id" :class="`text-` + column.align">
                    <span>{{ column.label }}</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows" :key="row.id">
                <td
                    v-for="column in studentColumns"
                    :key="column.id"
                    :class="`text-` + column.align + ` font-weight-bold`"
                    :style="`background-color: #f5f5f5;`"
                >
                    {{ column.field(row) }}
                </td>

                <PointsTableCell
                    v-for="column in examColumns"
                    :key="column.id"
                    :scored-points="column.field(row)"
                    :min-points="0"
                    :max-points="column.maxValue"
                    :grading-scale="column.gradingScale"
                    @update:scored-points="
                        (newScore) => handleScoredPointsChange(row.id, column.id)(newScore)
                    "
                ></PointsTableCell>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
import PointsTableCell from "@/components/table/PointsTableCell.vue";

export default {
    name: "PointsTable",

    components: { PointsTableCell },

    emits: ["update:newScore"],

    props: {
        studentColumns: {
            type: Array,
            required: true
        },
        examColumns: {
            type: Array,
            required: true
        },
        rows: {
            type: Object,
            required: true
        }
    },

    methods: {
        handleScoredPointsChange(studentId, examId) {
            return (newScore) => {
                this.$emit("update:newScore", studentId, examId, newScore);
            };
        }
    }
};
</script>

<style scoped>
th {
    vertical-align: bottom;
    text-align: center;
}

th span {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
}
</style>
