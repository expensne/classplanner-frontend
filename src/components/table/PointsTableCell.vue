<template>
    <td>
        <span style="display: flex; align-items: center">
            <input
                type="number"
                class="pa-0 ma-0 cellInput"
                v-model="editableScoredPoints"
                :min="minPoints"
                :max="maxPoints"
                @input="handleScoreChange"
            />
            <span v-if="hasValue" class="pa-0 ma-0 cellGrade" :style="{ color: gradeColor }">
                ({{ gradeInfo[grade].label }})
            </span>
            <span v-else class="pa-0 ma-0 cellGrade">-</span>
        </span>
    </td>
</template>

<script>
import { computeGrade } from "@/utils/computation";
import { GRADE_INFO } from "@/utils/constants";

export default {
    name: "PointsTableCell",

    emits: ["update:scoredPoints"],

    props: {
        scoredPoints: {
            required: true
        },
        minPoints: {
            type: Number,
            required: true
        },
        maxPoints: {
            type: Number,
            required: true
        },
        gradingScale: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            gradeInfo: GRADE_INFO,
            editableScoredPoints: this.scoredPoints
        };
    },

    computed: {
        grade() {
            return computeGrade(this.editableScoredPoints, this.maxPoints, this.gradingScale);
        },
        gradeColor() {
            return GRADE_INFO[this.grade].hexColor;
        },
        hasValue() {
            return this.editableScoredPoints !== null;
        }
    },

    methods: {
        handleScoreChange(event) {
            let value = event.target.value;

            if (value === "") {
                value = null;
            } else {
                value = parseFloat(value);

                if (isNaN(value)) {
                    throw new Error("Score must be a number");
                }

                // Clip to [0, maxPoints]
                value = Math.min(Math.max(value, 0), this.maxPoints);
            }

            this.editableScoredPoints = value;
        }
    },

    watch: {
        editableScoredPoints() {
            this.$emit("update:scoredPoints", this.editableScoredPoints);
        }
    }
};
</script>

<style scoped>
.cellInput {
    width: 3rem;
    text-align: right;
}
.cellGrade {
    font-size: 0.8rem;
    color: #666;
    min-width: 1rem;
}
</style>
