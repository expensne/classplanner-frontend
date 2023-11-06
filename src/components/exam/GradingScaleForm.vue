<template>
    <v-container class="pa-0">
        <v-row v-for="grade in gradeOrder" :key="grade" dense>
            <v-col class="align-self-center">
                <v-chip class="ma-0" :color="gradeInfo[grade].color" variant="outlined">
                    {{ gradeInfo[grade].label }}
                </v-chip>
            </v-col>

            <v-col cols="5">
                <v-text-field
                    label="Score"
                    variant="underlined"
                    type="number"
                    required
                    v-model.number="scores[grade.name]"
                    :rules="scoreValueRules"
                    @input="handleScoreChange"
                ></v-text-field>
            </v-col>

            <v-col cols="5">
                <v-text-field
                    label="Percent"
                    suffix="%"
                    variant="underlined"
                    type="number"
                    required
                    v-model.number="editablePercents[grade.name]"
                    :rules="percentValueRules"
                    @input="handlePercentChange"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row class="mt-n2">
            <v-col>
                <v-btn
                    prepend-icon="mdi-close-circle"
                    color="warning"
                    variant="outlined"
                    @click="handleReset"
                >
                    Reset to default
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script scoped>
import { GRADE_ORDER, GRADE_INFO } from "@/utils/constants";

export default {
    name: "GradingScaleForm",

    emits: ["update:percents"],

    props: {
        maxPoints: {
            type: Number,
            required: true
        },
        percents: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            gradeOrder: GRADE_ORDER,
            gradeInfo: GRADE_INFO,
            editablePercents: null,
            scores: null,
            scoreValueRules: [
                (value) => this.isValidScore(value) && this.isValidOrder(this.scores)
            ],
            percentValueRules: [
                (value) => this.isValidPercent(value) && this.isValidOrder(this.percents)
            ]
        };
    },

    created() {
        this.initScoresFrom(this.percents);
    },

    methods: {
        initScoresFrom(percents) {
            this.editablePercents = JSON.parse(JSON.stringify(percents));
            this.scores = this.percentsToScores(percents);
        },
        handleReset() {
            this.initScoresFrom(this.percents);
        },

        // Transforms
        percentsToScores(percents) {
            let scores = {};
            for (const [key, value] of Object.entries(percents)) {
                scores[key] = Math.round((value * this.maxPoints) / 100.0);
            }
            return scores;
        },
        scoresToPercents(scores) {
            let percents = {};
            for (const [key, value] of Object.entries(scores)) {
                percents[key] = Math.round((value * 100.0) / this.maxPoints);
            }
            return percents;
        },

        // Validation
        isValidScore(value) {
            if (value == null) return false;
            value = Number(value);
            if (isNaN(value) || value < 0 || value > this.maxPoints) return false;
            return true;
        },
        isValidPercent(value) {
            if (value == null) return false;
            value = Number(value);
            if (isNaN(value) || value < 0 || value > 100) return false;
            return true;
        },
        isValidOrder(arr) {
            let orderKeys = ["A", "B", "C", "D", "E", "F"];
            let orderIsValid = true;
            for (let i = 1; i < orderKeys.length; i++) {
                if (arr[orderKeys[i]] >= arr[orderKeys[i - 1]]) {
                    orderIsValid = false;
                    break;
                }
            }
            return orderIsValid;
        },

        // Event handlers
        handlePercentChange(event) {
            let value = event.srcElement.valueAsNumber;
            if (!this.isValidPercent(value)) return;
            if (!this.isValidOrder(this.percents)) return;
            this.scores = this.percentsToScores(this.percents);
        },
        handleScoreChange(event) {
            let value = event.srcElement.valueAsNumber;
            if (!this.isValidScore(value)) return;
            if (!this.isValidOrder(this.scores)) return;
            this.editablePercents = this.scoresToPercents(this.scores);
        }
    },

    watch: {
        editablePercents: {
            handler: function (newVal) {
                this.$emit("update:percents", newVal);
            },
            deep: true
        }
    }
};
</script>
